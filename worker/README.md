# Score server (developer notes)

The online leaderboard is a Cloudflare Worker (`src/index.js`) with a D1 database called `lantern-moth-scores`. GitHub Actions redeploys it automatically whenever anything in `worker/` changes. It uses two repository secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

Players are anonymous. Only the name, score, level, run length, game version and a random device id are stored.

## Editing the board
Open the Cloudflare dashboard, go to **Storage & databases → D1 → lantern-moth-scores → Console**, and run a command. The game's boards update immediately.

- **See the latest scores with their ids:**
  `SELECT id, name, score, level, created FROM scores ORDER BY id DESC LIMIT 20;`
- **Fix a name:** `UPDATE scores SET name = 'ABCD' WHERE id = 5;` (1–4 capital letters or digits)
- **Hide a score:** `UPDATE scores SET hidden = 1 WHERE id = 5;` (use `hidden = 0` to bring it back)
- **Delete a score for good:** `DELETE FROM scores WHERE id = 5;`
- **Wipe the whole board:** `DELETE FROM scores;`
