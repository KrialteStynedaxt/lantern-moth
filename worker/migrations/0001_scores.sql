-- Lantern Moth online leaderboard: one row per submitted run.
CREATE TABLE IF NOT EXISTS scores (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  name    TEXT    NOT NULL,            -- 1-4 letters/digits, filtered
  score   INTEGER NOT NULL,            -- Lumens
  level   INTEGER NOT NULL,
  version TEXT,                        -- game version that submitted it, e.g. 2.41
  client  TEXT,                        -- random id stored on the player's device (no personal data)
  iph     TEXT,                        -- one-way hash of the sender's network address, only for rate limiting
  dur     INTEGER,                     -- run length in seconds
  created INTEGER NOT NULL,            -- milliseconds since 1970 (UTC)
  hidden  INTEGER NOT NULL DEFAULT 0   -- set to 1 to remove a score from the boards
);
CREATE INDEX IF NOT EXISTS idx_scores_rank    ON scores (hidden, score DESC, created);
CREATE INDEX IF NOT EXISTS idx_scores_created ON scores (created);
CREATE INDEX IF NOT EXISTS idx_scores_client  ON scores (client);
CREATE INDEX IF NOT EXISTS idx_scores_iph     ON scores (iph, created);
