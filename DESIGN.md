# Design Brief — Marathon Runner

## Purpose
Premium GPS marathon running app. Live GPS tracker with real-time stats, in-run music player with track controls, Smart Pace Adjuster with live weather warnings, and offline run history with stats.

## Tone & Differentiation
Athletic brutalism: high-contrast dark theme, zero decoration, performance-driven. Live stats rendered in electric lime green monospace font create a "runner's dashboard" feel. Warning banners in electric red for pace alerts. Every UI layer has intentional contrast for clarity during intense physical activity.

## Color Palette (OKLCH)

| Token | L | C | H | Usage |
|-------|---|---|---|-------|
| background | 0.12 | 0 | 0 | Deep charcoal, primary surface |
| primary/accent | 0.75 | 0.18 | 130 | Electric lime green, CTAs, live stats |
| secondary | 0.70 | 0.20 | 200 | Electric cyan, real-time data |
| destructive | 0.60 | 0.25 | 25 | Electric red, pace warnings |
| muted | 0.28 | 0 | 0 | Dark grey, secondary info |
| card | 0.18 | 0 | 0 | Slight lift from background |
| foreground | 0.92 | 0 | 0 | Near-white text |

## Typography
- **Display:** Space Grotesk (bold, geometric sans-serif for hero stats, headers)
- **Body:** General Sans (clean, readable sans-serif for secondary UI)
- **Mono:** JetBrains Mono (stats, pace, elapsed time, timestamps)

## Structural Zones

| Zone | Background | Border | Elevation |
|------|-----------|--------|----------|
| Header/Nav | card (0.18) | border (0.25) | subtle |  
| Live Stats Overlay | card (0.18) | primary (0.75) accent border | elevated |
| Map Region | background (0.12) | none | base |
| Music Player Bar | card (0.18) | border (0.25) | floating |
| Warning Banners | destructive/0.1 | destructive left border | alert |
| History List | background (0.12) alternating card rows | border | none |
| Footer/Controls | card (0.18) | border (0.25) | subtle |

## Spacing & Rhythm
- **Dense:** 0.5rem for stat labels, badge spacing
- **Standard:** 1rem for card padding, list item margins
- **Loose:** 1.5rem–2rem for section breaks, between cards
- Border-radius: 0 for stats, 4px for cards/buttons, 12px for large container elements

## Component Patterns
- **Live Stats:** Monospace, lime green, large bold numerals with tiny uppercase labels below
- **Warning Banners:** Red left border, semi-transparent red background, white text
- **Buttons:** High-contrast lime green or cyan on dark background, no rounded corners on primary CTA
- **Cards:** Subtle lift via border and minimal shadow, dark background with clear text
- **Music Controls:** Previous/next always visible during run, track name in secondary accent color
- **History Items:** Dense row format, stats in monospace, date/time in muted text

## Motion
- Live indicator dot: subtle 2s pulse (0.4 → 1.0 opacity)
- Transitions: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for state changes
- No bounce, no entrance animations

## Signature Details
1. Live data rendered in monospace with electric green color — unique to runners
2. Lime green accent with red warning system creates instinctive danger/action affordance
3. Zero decoration theme focuses runner attention on metrics mid-run
4. Dark background reduces eye strain during daytime outdoor running

## Constraints
- Maximum 3 colors (lime, cyan, red) + neutrals
- No gradients, no blur effects
- Typography hierarchy via size/weight/case only, not color variation
- All interactive elements have clear visual affordance
