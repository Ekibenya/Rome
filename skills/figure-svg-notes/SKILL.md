---
name: figure-svg-notes
description: Cheat sheet for hand-coding a human body silhouette in SVG and wiring it as a game paper-doll / equipment screen — head-unit proportions mapped to viewBox coordinates, silhouette path construction, per-region hotspot hit areas, hover/clip-path highlight, elbow leader-line labels, and Cyberpunk 2077 cyberware-screen slot taxonomy and styling. Use when drawing a full-body figure in SVG, building a paper doll inventory UI, or making a CP2077-style body diagram with clickable parts.
---

# Figure-in-SVG + Paper-Doll Hotspot Notes

Self-compiled quick reference. Sources (paraphrased, not copied): Loomis "Figure Drawing for All It's Worth" head-unit canon; grimoire-core figure-drawing skill; CP2077 in-game cyberware/inventory screens (observational analysis); flame-systems & MMORPG paper-doll skill docs (slot/layer contracts).

## 1. Head-unit proportions → viewBox coordinates

Use a **7.5-head** figure (natural) or **8-head** (heroic/idealized — game UIs usually pick 8 for elegance). Work in a `viewBox="0 0 400 780"`, center axis `x=200`, head unit **u = 100** (7.5u figure + margins). All landmarks fall on u-multiples — build the guide grid FIRST, then draw:

| Landmark | head units | y (u=100) |
|---|---|---|
| top of skull | 0 | 20 |
| chin | 1.0 | 120 |
| shoulder line (pit of neck) | ~1.33 | 135–155 |
| nipple line | 2.0 | 220 |
| navel / elbow level | ~2.9 | 300 |
| pubic symphysis (mid-figure) | 3.75 (8-head: 4.0) | 375–395 |
| wrist / crotch level | ~3.9 | 390 |
| fingertips | ~4.5 | 450 |
| knee | ~5.5 | 550 |
| ankle | ~7.25 | 720 |

Widths (female silhouette, tune ±10% for stylization):
- Head: width ≈ 0.7–0.75 of head height (ellipse `rx≈34 ry≈50`).
- Shoulders: ≈ 1.5–1.6u total (half-width ~80 from axis). Male ≈ 1.8–2u.
- Waist: narrowest at ~2.7u height; half-width ~35–40.
- Hips: widest at ~3.5u; half-width ~75–80 — for a female read, hips ≈ shoulders (or slightly wider), with a pronounced waist-to-hip S-curve. For male: hips clearly narrower than shoulders.
- Hands reach mid-thigh; drawing them 20–30% too small is the classic error.

## 2. Silhouette path construction

- **One closed path per body region**, not one mega-path: head, torso, L/R arm, L/R leg. Regions = future hotspots. Overlap them slightly (5–8 units) so no seams show at joints.
- Draw the **right half only**, then mirror: `<use href="#half" transform="translate(400,0) scale(-1,1)"/>` — guarantees symmetry for an idle front pose. Break symmetry only deliberately (weight-shift pose).
- Curve grammar: **C (cubic)** for shoulder→waist→hip S-curves (the two control points let you place the waist pinch exactly); **Q (quadratic)** for long limb tapers (thigh→knee→calf→ankle); straight `L` almost never — bodies have no straight edges except stylized cyber-limbs, where straight chamfers + `A` arcs read as prosthetic.
- Joint landmarks = curve apexes: deltoid bulge at shoulder y≈160, calf bulge at y≈600. A limb is two opposing gentle curves, not parallel lines — outer line convex, inner line follows with offset taper.
- Wireframe look: `fill="none" stroke="currentColor" stroke-width="1.5"`, then add sparse horizontal "contour scan lines" (short arcs across torso/limbs every ~40 units, opacity .25) — instant CP2077 bio-scan feel without shading.
- Squint test from svg-authoring applies: silhouette must read filled solid black before any detail goes in.

## 3. Hotspot / paper-doll interaction

```svg
<g class="slot" data-slot="arms" tabindex="0" role="button" aria-label="Arms — cyberware slot">
  <path class="hit"    d="…arm region, slightly oversized…" fill="transparent" pointer-events="all"/>
  <path class="region" d="…visible arm subpath…"/>
  <circle class="anchor" cx="285" cy="250" r="4"/>
  <polyline class="leader" points="285,250 330,205 395,205" fill="none"/>
  <text class="label" x="399" y="209">ARMS</text>
</g>
```
- `.hit` transparent + `pointer-events="all"` = generous click zone independent of visual; keep visual `.region` `pointer-events="none"` so hover doesn't flicker on stroke gaps.
- Hover/selected state in CSS: `.slot:hover .region, .slot.selected .region { fill: var(--accent); fill-opacity:.25; filter: drop-shadow(0 0 6px var(--accent)); }` — animate only `opacity`/`transform` (GPU-cheap), not `d`.
- **clip-path highlight** (light up part of ONE shared silhouette instead of separate region paths): put the full silhouette twice — base version, plus a glowing duplicate with `clip-path="url(#clip-arms)"` where the clipPath is a rough rect/blob over that limb. Cheaper to author than clean per-region subpaths.
- Keyboard: `tabindex="0"` + `:focus-visible` same style as hover; fire on Enter/Space.

## 4. Leader-line label pattern (引导线)

CP2077/技术图鉴 style = **elbow polyline**: anchor dot on body → 45° stub (~40–60 units) → horizontal run to the margin column → label text aligned to line end. Rules (merged with svg-schematic-figures conventions):
- Reserve fixed label columns: left margin x=5–105, right margin x=295–395; body stays in x=110–290. Never let labels float over the figure.
- `stroke-width="1"`, optional `stroke-dasharray="4 3"`, opacity .6–.8; anchor marker: 3–4px circle or diamond; active slot's leader goes solid + full opacity.
- Stagger label y-positions ≥ 26 units apart; leaders must not cross each other — reorder labels by anchor height, alternate left/right columns by body side.
- Label: slot name (11–12px, tracking-wide caps OK for cyberpunk despite general sentence-case advice) + second `<tspan>` line for equipped item name in dimmer fill.

## 5. Slot taxonomy (CP2077 reference)

Cyberware screen groups (RipperDoc): Frontal Cortex, Operating System, Ocular System, Circulatory System, Immune System, Nervous System, Integumentary System (skin), Skeleton, Hands, Arms, Legs, Face. Gear screen: Head / Face / Inner Torso / Outer Torso / Legs / Feet + 3 weapon slots. Generic paper-doll layer contract (draw order back→front): base body → legs/feet gear → torso gear → arms/hands gear → head/hair → headgear → weapon → accessory/FX. Equipment change must visibly alter the doll — swap the layer's `<use>` href or toggle group visibility; keep every layer registered to the same skeleton anchor points (shoulder/hip/hand coordinates from §1) so items never drift.

## 6. CP2077 styling cues

Dark near-black bg (#0b0d10), desaturated red **#ff003c**, cyan **#5ee9f2**, warning yellow **#fcee0a**; 1px hairline strokes, cut-corner rectangles (chamfer one corner: `path` with a 10-unit 45° cut, not `rx`), corner brackets around the active slot, tiny meaningless serial numbers/glyphs at panel edges (11px mono, opacity .4), scanline overlay (repeating-linear-gradient 3px), occasional RGB-split glitch on selection (two offset copies, `mix-blend-mode: screen`, red/cyan). The body diagram itself is stroke-only cyan wireframe; selected region floods with translucent red/cyan fill.
