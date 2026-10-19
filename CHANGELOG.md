# Lantern Moth changelog

Each update raises the version by 0.01. The live game is always `index.html`; every version is its own commit titled "Lantern Moth v2.xx", so any older build can be restored from the commit history.

## v2.40 — 2026-10-19
- iPhone fixes. Opening the game somewhere scripts can't run (Files app, Quick Look, message or email previews) now shows a clear "open it from a web link" message instead of a dead screen.
- An on-screen error bar appears if anything fails while loading or playing, with the error and line number.
- Layout fallback for iOS 15 and older, which don't support container units.

## v2.39 — 2026-10-18
- The play area grows taller on tall screens: always 400 wide, 600 to 880 tall, never stretched.
- Fall speeds, the Weaver's position and his shot speed scale with the height, so every screen is equally fair and leaderboard scores stay comparable.
- New event: **Slime Rain** (level 35+, streak 25, 25 seconds). Green, blue and purple slimes replace spiders, getting bigger, slower and harder-hitting by colour. Distant background slimes fall during the event. Pays 35,000 Lumens (×1.1 per repeat) and restores glow. When the Weaver is also ready, it's a coin flip which one starts.

## v2.38 — 2026-10-18
- Weaver overhaul:
  - Web shots fly tip-first, are 1.5× bigger, and use uneven, hand-drawn-style webbing (randomly mirrored).
  - Venom globs come only after every 2–3 web shots.
  - The head now has 8 eyes and hangs below the abdomen.
  - He hangs from five threads that gather above him.
- Title screen is centred and raised, leaving room to see the moth.

## v2.37 — 2026-10-18
- The Hebrew Character moth is now the default moth. Players who had bought it get 100 coins back, once.
- New shop skin: **Polygrammate Wings** (100 coins).
- After a rebirth, spider events rest for 2 levels.
- New corner-web Weaver shot, with a hitbox that matches its drawn shape (the old one was about twice too big).
- The version number now shows in the title.

## Before v2.37 (unversioned)
- Mobile groundwork:
  - real-screen viewport sizing and safe areas
  - an in-play HUD bar
  - menus that scale and scroll on small screens
  - a fullscreen button (press F)
  - sharp rendering on high-density screens
- Mute moved into Options.
- Itsy-Bitsy now starts at level 10 and the Weaver at level 20.
- Lumi's shop portrait got room for her glow.
- North Star (Polaris) rebirth icon.
- Platinum coins.
