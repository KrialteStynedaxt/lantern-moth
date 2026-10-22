# Lantern Moth changelog

Each update raises the version by 0.01. The live game is always `index.html`; every version is its own commit titled "Lantern Moth v2.xx" and automatically gets a tagged Release with a downloadable `LanternMoth-v2.xx.html`.

## v2.48 — 2026-10-21
- **Glow bar** moved from the top bar to the bottom of the screen, centred just under the streak counter.
- **HUD:**
  - "LUMENS" now sits on the same line as the score, with Best underneath.
  - The level progress bar is centred under LEVEL.
- **Lumi's Lure:** twice the pull strength, over twice the area (it reaches about 1.4× farther sideways and upward).
- **Shop limits:**
  - You can hold up to 2 Rebirth Sparks and 1 Lure. The button changes to "Full" until they're spent.
  - All held Sparks are now spent on the next run, for up to +2 rebirths.
- **Leaderboard:** the screen is centred, and the title is bigger and never wraps.
- **Volume:** music now defaults to 100% for new players. Saved settings are kept.

## v2.47 — 2026-10-21
- **Bigger text** to suit the new fonts:
  - Body text, buttons, the HUD, the shop, leaderboard, Options, and Lumi's tutorial lines are about 15% larger.
  - In-game text (streak, pop-ups, banners, event timers) is larger too.
  - The "Lantern Moth" title keeps its size so it stays on one line.
- Leaderboard rows and shop buttons were re-fitted so nothing wraps on small phones.
- **Venom:** the Weaver's venom now has its own wet "ptuh" spit sound (it used to share a plain beep).
- **Slime Rain:** half as many distant slimes in the background.

## v2.46 — 2026-10-21
- **Font trial:**
  - **Latina Popular** replaces Syne for titles, headings, banners and event timers. Its file is in `fonts/`.
  - **Merienda** (Google Fonts) replaces DM Mono for all other text.
- **Lumi:**
  - Her wand now ends in a small Polaris star seated on its tip, matching the rebirth icon, with a soft glow that pulses slowly.
  - In the tutorial she drifts to a new spot every second or two and glides there, without the fast trembling.

## v2.45 — 2026-10-20
- **Spawning:**
  - Spiders and bats now spawn on separate timers, so bats never take a spider's place. Average rates are unchanged.
  - No more than 3 bats cross the screen at once.
  - Itsy-Bitsy (spiders only) and Slime Rain still bring twice the usual spider or slime rate. Bats stay away during Itsy-Bitsy and the Weaver, as before.
- **Lumi:**
  - Her wings now beat smoothly.
  - Her shop animation now runs on real time, so it no longer speeds up and stutters on 120 Hz screens.
  - Her wand sparkle pulses half as often again.
- **README** rewritten for newcomers. Developer notes for the leaderboard moved to `worker/README.md`.

## v2.44 — 2026-10-19
- **Leaderboard:** each player now holds a single spot on All-time and This week, with their best run. Lower runs are still saved but don't take extra places. After posting, the game tells you if your earlier best still stands.
- **Names:** up to 4 characters (was 3), so the default MOTH fits like any other name.
- **Options:** new **Reset all data** button at the bottom. It asks twice before erasing coins, items, skins, best score, saved runs, name and settings on this device. Online scores stay.
- **The Weaver:**
  - Now starts at a streak of 20 (was 25). Slime Rain still needs 25.
  - When both are available, a coin flip at streak 20 decides which one this streak gets.
  - Webs hold for 2.5 s (was 3).

## v2.43 — 2026-10-19
- **Lumi:** her wand sparkle pulses half as often, and her wings beat a little slower, in the shop, the tutorial and her secret flyby.
- **Itsy-Bitsy:**
  - Now triggers at a streak of 10 (was 15).
  - Spiders come at 2× the normal spider rate (was 1.25×).
  - Itsy spiders still fall at 1.25× normal speed.
- **The Weaver:** webs hold for 3 s (was 3.2), and he waits 1.5 s (was 1 s) before spitting venom at a caught moth.
- **Shop prices:**
  - Rebirth Spark: 20 coins (was 40).
  - Lumi's Lure: 10 coins (was 50).
  - Moonlit Wings and Polygrammate Wings: 50 coins each (was 100).

## v2.42 — 2026-10-19
- **Itsy-Bitsy** now sends spiders at 1.25× the normal spider rate (it was about 2.75×).
- **The Weaver:**
  - Shots already in the air keep flying after he leaves instead of vanishing.
  - Webs now hold you twice as long (3.2 s), and each wriggle frees you half as much.
  - While you're caught, he pauses for 1 second, then spits only venom, more slowly (every 1.6 s), and venom can hit a caught moth.
  - Once you break free, he takes a short breath and returns to his usual web-and-venom pattern.
- **Lumi's stall:** Lumi now floats slowly instead of trembling.

## v2.41 — 2026-10-19
- **Online leaderboard.** The Leaderboard now has three tabs: **All-time** and **This week** (top 50 worldwide, resets Mondays UTC) and **My runs** (your local top 10).
- Your own entries are highlighted, and your rank is shown even if you're outside the top 50.
- Signing your name on a top-10 run posts it online. Offline runs wait in an outbox and are sent when you reconnect.
- Offensive names are refused, and developer-start runs stay off the boards.
- New score server (`worker/`, a Cloudflare Worker with a D1 database) that rejects impossible scores and floods. It's deployed automatically by GitHub Actions.

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
