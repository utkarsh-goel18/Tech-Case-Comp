# PRIMUS Product Alignment & Frontend Architecture

Status: **M2 complete — frontend implementation is underway on the same working branch.**
Working branch: `redesign/primus-frontend`

## 1. Purpose and guardrails

This document maps the current Market Simulation application to the PRIMUS participant and organiser experience. The repository is the agreed codebase. Its existing backend is actively being developed, so this work treats the current database, engine, authentication, server actions, RLS and RPC contracts as protected interfaces.

This is a product and frontend alignment document, not a declaration that every PRIMUS rule is already implemented. Where the available repository evidence does not establish a PRIMUS rule, the rule is marked **backend/product confirmation required** rather than guessed.

### Non-negotiable constraints

- Do not rewrite or bypass Supabase RPCs, RLS, auth, server actions, the engine or database triggers as part of visual redesign.
- Do not add client-side authority for money, trading limits, phase timing, judging, scores or results.
- Do not fabricate market activity, KPIs, notifications, countdowns, participant counts or operational health.
- Preserve the independent `/display` experience and its read-only access model.
- Preserve existing route URLs and data-testid selectors unless a migration is deliberately planned and tests are updated with it.
- Keep all money as server-provided integer-cent values formatted by existing helpers.
- Any mismatch between PRIMUS materials and current engine/database behaviour must be raised explicitly for the backend owner.

## 2. What exists today

The current app is a substantial Market Simulation platform, not a blank dashboard. It has:

- Next.js App Router, TypeScript, Tailwind 4 and React 19.
- Supabase Postgres, Auth, Realtime, RLS and database-side game functions.
- A pure TypeScript engine under `packages/engine`.
- Participant portal under `apps/web/app/team`.
- Organiser/fairness console under `apps/web/app/admin`.
- Separate read-only projector under `apps/web/app/display`.
- Server actions and data loaders under the app and `apps/web/lib`.
- A broad Playwright e2e suite for participant, admin and display flows.

The current UI is largely a compact light-mode utility interface: slate/white surfaces, standard system typography, small bordered panels, dense tables and conventional navigation. It is functional but does not yet express the intended PRIMUS identity.

The current game documentation describes 150 teams across Product, Consulting and Finance tracks, with a company-building, crisis/rescue and stock-market simulation. The repo's own brief and participant/staff guides are the source of truth for existing behaviour until the backend team confirms PRIMUS changes.

## 3. PRIMUS experience map

The following is the target experience based on the PRIMUS event brief discussed by the organisers. It is a frontend information architecture proposal; it does not assert that the backend already exposes every item.

### Participant portal

| Target area | Intended participant job | Existing surface to inspect/reuse | Integration status |
|---|---|---|---|
| Home / command centre | Understand current stage, next action, deadlines, team status and latest official updates | `/team`, team layout, action bar, alerts, phase end | Existing data model is available; PRIMUS labels and action priorities need confirmation |
| Team workspace | Coordinate team identity, assigned track/problem and submissions | `/team/squad`, pitch, plan, problem and flash routes | Existing squad and submission flows; confirm PRIMUS deliverables and round limits |
| Product / business submission | Create and submit the business/solution artefacts required by the current round | `/team/squad/pitch`, `/team/squad/plan` | Current forms are legacy-specific; map fields before changing copy or validation |
| Rescue / consulting | Review assigned company, prepare rescue proposal and submit terms | `/team/rescue`, `/team/calls` | Existing rescue/call mechanics; confirm whether PRIMUS keeps these exact mechanics |
| Q&A / communication | Ask and answer public questions; receive official communication | `/team/qa`, `/team/chat`, `/team/bulletins` | Existing functionality; clarify public/private scope and PRIMUS moderation expectations |
| Market overview | Understand listed companies, prices and movement | `/team/market`, market detail and book | Existing market; confirm PRIMUS trading rounds, instruments and visibility rules |
| Trading terminal | Place valid orders and understand available funds, holdings and restrictions | `/team/trade`, IPO, positions, history | Preserve server-side validation and RPC flow; reconcile rules with current backend |
| Portfolio / ledger | Track cash, positions, orders, transactions and portfolio value | `/team/ledger`, trade positions/history, earnings | Existing records; redesign presentation without changing accounting semantics |
| Judging / results | See submission status, feedback and released scores | `/team/judging`, earnings | Existing judge pipeline; score release and visibility are backend-controlled |

### Organiser console

| Target area | Intended organiser job | Existing surface | Integration status |
|---|---|---|---|
| Operations overview | See event state, live stage, blockers, connectivity and urgent actions | `/admin/[slug]` phase control + health | Existing phase control is not yet a complete operations overview |
| Live phase control | Advance, pause, resume, extend and close rounds safely | `/admin/[slug]`, rounds | Strong existing functionality; retain confirmations and server authority |
| Participants and teams | Find teams, inspect status and resolve access/registration issues | lottery, fairness, exports, team data | A unified participant directory is not evident in current nav; backend confirmation required |
| Draw / allocation | Run and independently verify team/squad/problem allocation | `/admin/[slug]/lottery` | Existing lottery workflow; confirm PRIMUS draw rules and inputs |
| Round operations | Monitor open round, pending orders, clearing and round history | `/admin/[slug]/rounds` | Existing trading engine controls; retain preview and auditability |
| Submissions / judging | Monitor submissions, start judging, inspect runs, retry and release results | `/admin/[slug]/judge` and calibration | Existing judge console; align labels and judging rubric with PRIMUS |
| Announcements / content | Publish official updates and manage event materials | bulletins and content | Existing; confirm new content types and publishing permissions |
| Ledger / corrections | Audit money movement and approve corrections with separation of duties | ledger and corrections | Existing audit workflow; preserve two-person approval |
| Fairness | Review flags and evidence and record decisions | fairness | Existing fairness officer area; preserve role restrictions |
| Exports / health | Export event records and monitor system health | exports and health | Existing; redesign for operator speed and legibility |

### Projector / public display

Keep `/display` as a separate product surface, not a participant dashboard skin. Its read-only account, realtime updates, phase clock, market board and takeover/award moments are distinct from organiser controls. A later visual pass can align typography, palette and motion while retaining the existing 1920×1080-first composition and no-control model.

## 4. Design direction

### Visual thesis: a live institutional decision arena

PRIMUS should feel like a high-stakes overnight business simulation: editorial, composed, precise and legible under pressure. The Matrix theme should be a restrained visual language, not a wall of green code.

- **Base:** deep ink/graphite surfaces for event framing, balanced with warm off-white reading surfaces for long submissions and tables.
- **Accent:** controlled acid-lime/emerald for live state and primary actions; amber for caution/deadlines; red only for destructive or adverse states.
- **Typography:** distinctive display face for section titles, highly legible sans for interface copy, tabular mono for tickers, prices, round numbers and timestamps.
- **Layout:** strong page hierarchy, deliberate whitespace, asymmetric editorial feature areas where useful, dense data only where the task demands it.
- **Motion:** restrained transitions for navigation, phase changes and market movement; respect reduced-motion preferences. No perpetual decorative animation.
- **Components:** square-to-gently-rounded geometry, fine borders, clear focus states, purposeful empty states and strong table treatment. Avoid repetitive rounded KPI-card grids.
- **Responsive:** participant workflows must work on phones first-class; organiser consoles optimise for laptop/desktop but remain usable on tablets.

### Shared shell principles

Participant shell:
- Persistent event identity and current phase.
- A clear next-action region, not a generic stack of metrics.
- Cash/portfolio indicators remain available where useful but do not dominate every page.
- Navigation grouped by the participant's actual workflow and track.
- Live connection and paused/rehearsal state are visible but quiet.

Organiser shell:
- Operational overview first; detailed modules second.
- Current phase, clock, trading state and connection health are always findable.
- High-risk controls visually distinct, confirmed and accompanied by consequences.
- Tables prioritise scanability, filters and actionable row details.
- Fairness-only actions remain gated by role.

## 5. Existing route and behaviour preservation map

Participant route families currently present:
- `/team`
- `/team/squad` and nested `pitch`, `plan`, `problem`, `flash`
- `/team/rescue`, `/team/calls`, `/team/qa`, `/team/chat`, `/team/bulletins`
- `/team/market`, `/team/market/[ticker]`, `/team/market/book`
- `/team/trade`, `ipo`, `positions`, `history`
- `/team/ledger`, `/team/judging`, `/team/earnings`

Organiser route families currently present:
- `/admin`, `/admin/[slug]`
- `bulletins`, `chats`, `content`, `exports`, `fairness`, `health`
- `judge` and `judge/calibration`
- `ledger`, `ledger/corrections`, `lottery`, `rounds`

Display route family:
- `/display`, `/display/[slug]`

The redesign should initially preserve these route contracts and refactor their visual composition in place. Consolidating routes or renaming URLs is a separate migration, not a prerequisite for the visual overhaul.

## 6. Backend contract and dependency register

These areas must be confirmed with the backend owner before implementing PRIMUS-specific behaviour:

1. **Canonical event stages:** which phase codes and transition rules will be used for PRIMUS? Current engine codes and labels are legacy market-simulation specific.
2. **Tracks and team composition:** confirm whether Product, Consulting and Finance remain exactly as implemented, and whether teams/squads are allocated the same way.
3. **Submission schema:** confirm exact PRIMUS deliverables, required fields, word limits, deadlines, versioning and whether drafts/autosave are supported.
4. **Rescue / consulting mechanics:** confirm whether assigned companies, calls, rescue proposals, deal terms and fee deadlines remain.
5. **Market mechanics:** confirm IPO, crisis shock, trading instruments, order limits, collateral, clearing cadence and portfolio accounting. Current engine supports legacy-specific concepts including shorts/covers and IPO.
6. **Judging:** confirm rubrics, judge inputs/outputs, retry/appeal process, release controls and participant-visible feedback.
7. **Leaderboard / results:** confirm when ranks are hidden, frozen, revealed and exported.
8. **Participant access:** confirm registration/account provisioning, team membership and reset/recovery flows.
9. **Organiser roles:** confirm organiser vs fairness permissions and whether additional staff roles are needed.
10. **Realtime events:** confirm broadcast payloads and which screens refresh on each event.
11. **Public display:** confirm which PRIMUS moments and data should appear on the projector.
12. **Event content:** confirm official PRIMUS copy, terminology, track names and round names.

No frontend should infer a missing value from a similar legacy field. Until the contract is agreed, show the existing server-provided data with neutral copy or keep the corresponding PRIMUS-specific UI behind a clearly isolated integration seam.

## 7. Proposed frontend implementation sequence

### M2 — alignment (this document)
- Map current routes and capabilities to the participant, organiser and display journeys.
- Record legacy/PRIMUS mismatches and backend dependencies.
- No app code or database changes.

### M3 — foundation
- Establish design tokens, typography, page primitives, navigation and responsive shell.
- Build shared status, phase, deadline, empty, error, table and confirmation treatments.
- Keep server-side loaders/actions intact.
- Validate each shell against existing e2e selectors.

### M4 — participant experience
- Redesign home/command centre first.
- Then submissions/workspace, communication, rescue, market/trading and portfolio/results.
- Preserve all current actions and validation.
- Reconcile copy and form fields with confirmed PRIMUS requirements.

### M5 — organiser experience
- Build an operational overview from existing trustworthy data.
- Redesign phase control, rounds, teams/lottery, judging, bulletins/content, ledger/fairness, exports and health.
- Preserve two-step confirmations, audit trails and role gates.

### M6 — display
- Align visual identity while retaining independent read-only architecture and projector composition.

### M7 — verification
- Run unit/typecheck/build/e2e against local Supabase when a runnable environment is available.
- Check keyboard navigation, focus, reduced motion, narrow phone widths, tablet, laptop and 1920×1080 display.
- Do not mark a test as passed unless it was actually executed.

## 8. Definition of done

- No backend contract or database migration changed as a side effect of styling.
- Existing participant/admin/display journeys remain functional.
- No placeholder controls or fabricated live data.
- Responsive layouts are tested at phone, tablet, laptop and projector dimensions.
- Existing tests pass; new tests cover any changed interactions.
- PR description lists changed routes, preserved contracts, test evidence and unresolved backend dependencies.
- No merge recommendation until the PR has been reviewed and verified.

## 9. Open questions for backend coordination

The frontend can proceed on shell, navigation and visual foundations using current contracts. Before replacing legacy domain terminology or changing participant workflows, obtain the backend team's canonical PRIMUS phase list, track/team model, submission schemas, trading rules, judging rubric and role matrix. These are product-contract decisions, not styling decisions.
