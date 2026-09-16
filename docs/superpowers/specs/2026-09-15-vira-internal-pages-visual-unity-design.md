# VIRA Internal Pages Visual Unity — Design Specification

**Date:** 2026-09-15  
**Status:** Approved visual direction; implementation pending final spec review  
**Golden master:** `paver.html`

## 1. Goal

Unify the six internal VIRA pages under one coherent visual and interaction system derived from `paver.html`, while preserving the page-specific content, technical meaning, assets and functions of each route. The home page (`index.html`) is explicitly frozen and must not be visually or structurally changed in this phase.

## 2. Scope

Pages in scope:

1. `paver.html` — golden master/reference
2. `blocos.html`
3. `guias.html`
4. `central-tecnica.html`
5. `passaporte.html`
6. `brandbook.html`

Out of scope:

- `index.html` and all home-specific CSS/JS
- content rewriting that changes technical claims or page purpose
- VIRA logo redesign or generated substitutes
- removal of page-specific data visualizations, canvases, diagrams or technical content unless required to fit the shared layout

## 3. Visual Principle

All six pages must feel like sections of the same VIRA technical platform. Page identity comes from content, technical labels, diagrams and hero background behavior — not from different design systems.

`paver.html` defines the canonical visual language for:

- color usage
- typography
- page width and alignment
- spacing rhythm
- telemetry ribbon
- sticky header
- indexed navigation
- active-state pill
- CTA treatment
- hero composition
- buttons
- badges and technical labels
- cards and surfaces
- technical tables and metric modules
- section separators
- footer structure
- VIRA brand application
- mobile navigation behavior

## 4. Canonical Design Tokens

### Colors

- Obsidian: `#040A07`
- Dark: `#08110D`
- Forest: `#0D1A12`
- Border: `#142519`
- Gold: `#F1C546`
- Gold hover: `#D9AD34`
- Surface: `#FAF9F6`
- Muted: `#7E8B83`
- Card: `#101C15`
- Border subtle: `#1C2E22`
- Emerald/status green: reserved for operational, verified or positive-status information

No page may introduce an alternative primary palette for the shared shell.

### Typography

**Manrope**
- display headlines
- section headlines
- editorial body copy
- buttons
- large metrics

**IBM Plex Mono**
- telemetry
- page index labels
- standards and normative references
- technical metadata
- captions
- specifications
- status text
- microcopy

## 5. Shared Shell

### 5.1 Telemetry Ribbon

Use the `paver.html` telemetry ribbon as the structural reference:

- same height and vertical rhythm
- same dark background
- same mono typography
- same status indicator behavior
- same left/right grouping logic
- page-specific normative text is allowed
- CTA wording remains consistent where the destination exists

### 5.2 Main Header

All pages use one canonical header geometry:

- same sticky behavior and sticky offset
- same height
- same max-width container
- same horizontal padding
- same logo size
- same brand clear-space
- same page-specific descriptor to the right of the logo
- same indexed navigation from `01` to `06`
- same active-state gold outlined pill
- same `ESPECIFICAR PROJETO` CTA
- same responsive breakpoint behavior

The only navigation difference among pages is which item is active.

### 5.3 Mobile Navigation

All pages use the same drawer composition, order, spacing, typography and active-state logic. Page-specific differences are limited to the active item and the CTA target if required by that page.

## 6. Hero System

All pages adopt the same hero anatomy as `paver.html`:

1. dark technical background
2. optional page-specific interactive canvas / diagram layer
3. readability gradient/mask
4. technical kicker
5. large Manrope headline
6. selective gold/gradient emphasis
7. concise technical description
8. primary/secondary action or technical status row when available
9. consistent bottom spacing and border transition into the next section

Hero height, content width, headline scale, paragraph width and vertical spacing must be normalized across the six pages.

Page-specific canvas behavior may remain unique, but it must behave as a background layer rather than redefining the hero layout.

## 7. Brand Application

The official VIRA logo is canonical and immutable.

Requirements:

- use one official local asset from `/assets` for all six pages
- remove dependence on externally hosted temporary logo URLs in the shared header
- preserve aspect ratio
- do not recreate, redraw, recolor, stretch or crop the mark
- use the same rendered height on all six pages

## 8. Shared Content Components

The following components should inherit the Paver visual grammar even when their page-specific content differs:

- section kicker
- section headline
- body copy block
- metric row
- specification card
- technical data card
- table
- download/document card
- status badge
- accordion/details block
- CTA band
- footer

Existing semantic content should remain intact unless a layout adaptation is necessary.

## 9. Footer

Create one canonical internal-page footer derived from the visual language of `paver.html` and apply it to all six pages.

The footer must preserve:

- VIRA identity
- navigation back into the six-page technical ecosystem
- institutional information already present and verified
- consistent typography, spacing, borders and colors

A user moving from Paver to DPP or Brandbook must not feel they have entered another microsite.

## 10. Architecture

Create a shared internal-page layer instead of allowing every HTML page to maintain its own near-duplicate design system.

Preferred structure:

- `internal-pages.css` — shared shell, typography, tokens, layout normalization and reusable component rules
- `internal-pages.js` — shared navigation/mobile behavior and small shell interactions only where necessary

Existing page-specific scripts remain responsible for their own canvas, technical diagrams and route-specific interactions.

The shared layer must not be loaded by `index.html` in this phase.

## 11. Page-by-Page Adaptation

### `paver.html`

- remains visual reference
- only receives minimal refactoring required to consume the shared layer
- visual output should not intentionally change

### `blocos.html`

- normalize hero composition to Paver geometry
- normalize surface/light-vs-dark section rhythm
- replace local token naming with shared tokens where practical
- retain block-specific technical content and canvas behavior

### `guias.html`

- normalize hero composition and spacing
- normalize technical badges, metrics and section hierarchy
- retain guide/curb-specific visual background behavior

### `central-tecnica.html`

- replace its alternate telemetry/header spacing with canonical shell
- align hero width, padding and headline scale with Paver
- preserve repository/download/document functionality

### `passaporte.html`

- already close to Paver; perform normalization rather than redesign
- align remaining footer/component/spacing differences
- preserve DPP-specific information architecture

### `brandbook.html`

- remove the feeling of a separate microsite shell
- use the canonical telemetry/header/hero/footer system
- preserve brandbook content and official identity guidance
- keep Brandbook as item `06` in the common navigation

## 12. Responsive Rules

Validate at minimum:

- 1440 × 900 desktop
- 1024 × 768 tablet
- 390 × 844 mobile

Requirements:

- no horizontal overflow
- header/navigation does not collide with CTA
- mobile drawer is consistent on all six pages
- hero headline remains readable without awkward orphaning
- technical tables/cards remain usable on narrow screens
- canvases never block interaction or create layout overflow

## 13. Accessibility and Interaction

- preserve semantic landmarks (`header`, `nav`, `main`, `footer`)
- preserve or improve `aria-current` on active nav item
- preserve keyboard focus visibility
- interactive canvas layers must not prevent use of navigation or CTAs
- buttons/links must retain adequate contrast
- reduced-motion behavior should be respected where page-specific animations are modified

## 14. Testing and Acceptance Criteria

The implementation is accepted when:

- the six internal pages visibly share the same shell and visual grammar
- switching between routes does not produce jumps in header geometry
- typography and base palette are consistent
- the active menu item changes correctly per page
- one official local VIRA logo asset is used consistently
- hero anatomy is recognizably the same across all six routes
- footer anatomy is the same across all six routes
- route-specific content and interactions still work
- no regressions are introduced into `index.html`
- desktop, tablet and mobile smoke tests pass

## 15. Non-Negotiable Constraint

`index.html` and the current home experience remain untouched in this phase. No shared internal-page stylesheet or script may be introduced into the home unless explicitly approved in a later phase.
