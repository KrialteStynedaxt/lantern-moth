# Lantern Moth

A night-sky arcade game. Fly into lanterns to keep your glow alive, dodge spiders, bats and slimes, and survive the Weaver.

**Play:** https://krialtestynedaxt.github.io/lantern-moth/

## Controls
- **Keyboard:** arrow keys or A / D to steer. P or Esc pauses. F toggles fullscreen.
- **Touch:** drag anywhere to steer.

## Testing
- Open the play link in Safari, Chrome or any browser. Downloaded copies opened from the Files app or a message preview won't run, because previews block scripts.
- Found a bug or have an idea? Open an **Issue** on this repository and include a screenshot. If a red error bar appears in the game, screenshot that too.

## Versions
- `index.html` is always the latest game.
- Each update raises the version by 0.01 and gets an entry in [CHANGELOG.md](CHANGELOG.md).
- Each version is its own commit titled "Lantern Moth v2.xx".
- Every new version automatically gets a tag (`v2.xx`) and a **Release** with its changelog notes and a downloadable `LanternMoth-v2.xx.html`. See the Releases list on the repository page.

## Online leaderboard
- Scores are stored by the score server in `worker/` (a Cloudflare Worker with a D1 database called `lantern-moth-scores`). GitHub Actions redeploys it automatically whenever `worker/` changes.
- Each player (one device) shows once per board, with their best run. Lower runs stay in the database but don't show.
- The server refuses offensive names, impossible scores and rapid-fire submissions. Players are anonymous: only the name, score, level, run length, game version and a random device id are stored.
- **Removing a score:** in the Cloudflare dashboard, open **Storage & databases → D1 → lantern-moth-scores → Console** and run:
  - `SELECT id, name, score, level, created FROM scores ORDER BY score DESC LIMIT 50;` to find it
  - `UPDATE scores SET hidden = 1 WHERE id = <id>;` to hide it (set `hidden = 0` to bring it back)
