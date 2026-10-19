// Lantern Moth score server.
//   GET  /scores?board=all|week&limit=50&client=<id>  -> top scores, plus the asking player's best rank
//   POST /scores  {name, score, level, dur, version, client} -> saves a run after sanity checks
// Scores live in the D1 database bound as DB (see wrangler.toml and migrations/).

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

// Names are 1-3 letters/digits (4 only for the game's "MOTH" fallback). Keep this list in sync with NAME_BLOCK in index.html.
const NAME_RE = /^[A-Z0-9]{1,4}$/;
const NAME_BLOCK = new Set([
  "ASS", "CUM", "CNT", "COK", "CUN", "DIC", "DIK", "DCK", "FAG", "FCK", "FGT", "FUC", "FUK", "FUQ",
  "JIZ", "KKK", "KYS", "NAZ", "NGA", "NGR", "NIG", "PUS", "SEX", "SHT", "SLT", "TIT", "TWT", "XXX",
  "COCK", "CUNT", "DICK", "FUCK", "NAZI", "PISS", "SHIT", "SLUT", "TITS", "TWAT"
]);
const CLIENT_RE = /^[A-Za-z0-9-]{8,64}$/;

// Generous limits: they only stop results no real run could produce.
const MAX_SCORE = 2000000000;
function maxScoreFor(level) { return 400 * level * level * level + 250000 * level + 60000; }
function minSecondsFor(level) { return (level - 1) * 3; }

// Rate limits per sender (by hashed network address) and per device.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 12;

function json(body, status) {
  return new Response(JSON.stringify(body), { status: status || 200, headers: Object.assign({ "Content-Type": "application/json" }, CORS) });
}

// Weekly boards reset at Monday 00:00 UTC.
function weekStart(now) {
  const d = new Date(now);
  const back = (d.getUTCDay() + 6) % 7;
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - back);
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}

async function rankOf(db, score, since) {
  const row = await db.prepare("SELECT COUNT(*) AS c FROM scores WHERE hidden = 0 AND created >= ? AND score > ?").bind(since, score).first();
  return (row ? row.c : 0) + 1;
}

async function getScores(url, env) {
  const board = url.searchParams.get("board") === "week" ? "week" : "all";
  const limit = Math.max(1, Math.min(100, parseInt(url.searchParams.get("limit") || "50", 10) || 50));
  const client = url.searchParams.get("client") || "";
  const okClient = CLIENT_RE.test(client);
  const since = board === "week" ? weekStart(Date.now()) : 0;

  const res = await env.DB.prepare(
    "SELECT name, score, level, version, created, client FROM scores WHERE hidden = 0 AND created >= ? ORDER BY score DESC, created ASC LIMIT ?"
  ).bind(since, limit).all();
  const top = (res.results || []).map(function (r, i) {
    return { rank: i + 1, n: r.name, s: r.score, l: r.level, v: r.version, d: r.created, me: okClient && r.client === client };
  });

  let me = null;
  if (okClient) {
    const best = await env.DB.prepare(
      "SELECT name, score, level FROM scores WHERE hidden = 0 AND created >= ? AND client = ? ORDER BY score DESC, created ASC LIMIT 1"
    ).bind(since, client).first();
    if (best) me = { rank: await rankOf(env.DB, best.score, since), n: best.name, s: best.score, l: best.level };
  }
  return json({ board: board, since: since, top: top, me: me });
}

async function postScore(req, env) {
  let body;
  try { body = await req.json(); } catch (e) { return json({ error: "bad_request" }, 400); }
  if (!body || typeof body !== "object") return json({ error: "bad_request" }, 400);

  const name = String(body.name || "").toUpperCase();
  const score = Math.floor(Number(body.score));
  const level = Math.floor(Number(body.level));
  const dur = Math.floor(Number(body.dur));
  const version = String(body.version || "").slice(0, 12);
  const client = String(body.client || "");

  if (!NAME_RE.test(name) || NAME_BLOCK.has(name)) return json({ error: "name" }, 400);
  if (!CLIENT_RE.test(client)) return json({ error: "bad_request" }, 400);
  if (!Number.isFinite(score) || score < 1 || score > MAX_SCORE) return json({ error: "bad_request" }, 400);
  if (!Number.isFinite(level) || level < 1 || level > 1000) return json({ error: "bad_request" }, 400);
  if (!Number.isFinite(dur) || dur < 0 || dur > 86400) return json({ error: "bad_request" }, 400);
  if (score > maxScoreFor(level) || dur < minSecondsFor(level)) return json({ error: "implausible" }, 422);

  const now = Date.now();
  const ip = req.headers.get("CF-Connecting-IP") || "unknown";
  const iph = await sha256Hex("lantern-moth:" + ip);
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS c FROM scores WHERE created > ? AND (iph = ? OR client = ?)"
  ).bind(now - WINDOW_MS, iph, client).first();
  if (recent && recent.c >= MAX_PER_WINDOW) return json({ error: "slow_down" }, 429);

  await env.DB.prepare(
    "INSERT INTO scores (name, score, level, version, client, iph, dur, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).bind(name, score, level, version, client, iph, dur, now).run();

  return json({ ok: true, rank: await rankOf(env.DB, score, 0), wrank: await rankOf(env.DB, score, weekStart(now)) });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (url.pathname === "/" ) return json({ ok: true, service: "lantern-moth-scores" });
    if (url.pathname !== "/scores") return json({ error: "not_found" }, 404);
    try {
      if (req.method === "GET") return await getScores(url, env);
      if (req.method === "POST") return await postScore(req, env);
      return json({ error: "method" }, 405);
    } catch (e) {
      return json({ error: "server" }, 500);
    }
  }
};
