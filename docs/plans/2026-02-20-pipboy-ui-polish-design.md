# Pip-Boy UI Polish — Design Doc

**Goal:** Enhance the visual and interactive fidelity of the Pip-Boy cheat sheet to match FO4 aesthetics more closely.

---

## Visual changes

| What | How |
|---|---|
| Screen border-radius 16px | `.screen-wrap { border-radius: 16px; overflow: hidden }` |
| Remove dividing lines | Strip all `border-right/bottom/top` between panels |
| Footer dark green | `.statusbar { background: #071407 }` |
| Font weight 800 | Global `font-weight: 800` on `.pipboy` |
| Text blur (CRT phosphor) | `text-shadow: 0 0 4px currentColor` on text elements + `filter: blur(0.35px)` on content panels (not images) |
| Screen flicker enhanced | Stronger `crt-flicker` keyframes with `brightness` variation |
| Interlaced scanlines | `body::before` 2px repeating gradient + `@keyframes interlace` shifts pattern 1px at 10fps |
| Tabs + subnav font bigger | `.tab-btn: 1em`, `.subnav: 0.9em` (up from 0.85/0.75) |

## Navigation

- **◀ / ▶ buttons** flanking the tab row — cycle through categories (wraps around)
- **Arrow keys ←/→** on keyboard — same as buttons
- **Arrow keys ↑/↓** on keyboard — move through term list, auto-scroll into view

## Data

- **List value** shows `termIdx + 1` (ordinal position in category), not rank
