# PRIMUS Frontend Redesign — Progress

## Project rules
- Work only in `redesign/primus-frontend`; never push to `main`.
- Fork `utkarsh-goel18/Tech-Case-Comp` is the source of truth.
- The user confirmed this is the correct codebase; backend work is ongoing.
- Treat current backend contracts as protected. Do not change engine, migrations, RLS, auth, RPCs or server actions as part of visual work.
- Do not present legacy game mechanics as confirmed PRIMUS rules.
- Keep `/display` as a separate read-only surface.

## Status
- [x] M0: Scope and repository connection
- [x] M1: Initial GitHub source audit
- [x] M2: PRIMUS product alignment and route mapping
- [x] M3: Design tokens, shared primitives, participant and organiser shells (CI verification pending)
- [x] M4: Participant experience visual pass — route-aware headings, home/task hierarchy, participant shell, status strips and workflow surfaces
- [x] M5: Market/trading visual pass — shared data-table and form styling, order desk metrics and consistent route context; trading rules unchanged
- [x] M6: Organiser visual pass — event selector, control shell, section navigation, event overview and route-aware headings
- [x] M7: Projector visual pass — live arena identity, phase/round timers, bulletin and ticker styling; read-only data path retained
- [ ] M8: Local verification — run typecheck, lint, unit/database tests, production build and full Playwright suite; inspect participant, organiser and 1920×1080 projector at desktop/mobile widths

## M1 — Repository baseline
- Default branch: `claude/market-simulation-platform-9rk357`.
- Working branch: `redesign/primus-frontend`.
- pnpm monorepo; root package `market-sim`.
- Frontend: `apps/web`; Next.js 16.4.3, React 19.3.0, TypeScript, Tailwind 4.
- Supabase Postgres/Auth/Realtime/RLS; pure TypeScript engine in `packages/engine`.
- Participant routes under `apps/web/app/team`; organiser/fairness routes under `apps/web/app/admin`; independent projector under `apps/web/app/display`.
- Existing Playwright coverage includes participant, organiser and display journeys.
- No typecheck, build, unit tests or e2e tests have been executed by this remote GitHub-only workflow.

## M1 — Important existing capabilities
- Participant home, squad workspace, submissions, rescue/calls, Q&A, chat, bulletins, market, trading, positions, history, ledger, judging and earnings.
- Organiser phase controls, lottery, rounds, judge/calibration, bulletins/content, ledger/corrections, fairness, exports and health.
- Server-authoritative actions and database functions, realtime event updates, role separation and audit-oriented controls.
- The current product documentation still describes the legacy Market Simulation game (Product/Consulting/Finance, IPO, shorts/covers, legacy phases and rescue mechanics). These details are not automatically PRIMUS requirements.

## M4–M7 — Experience foundations (implementation complete; local QA pending)
- Added route-aware headings across participant and organiser sections without changing URLs or loaders.
- Refined participant home task states and the trading desk's cash/limits presentation.
- Standardised the organiser route context through the shared shell.
- Extended the PRIMUS identity to the independent projector header, phase/round timers, bulletin strip and ticker.
- Added route-level defaults for legacy tables and form controls, keyboard focus treatment and consistent status/bulletin strips.
- Corrected the organiser event overview heading and kept the page-heading hierarchy unambiguous.
- Preserved all existing actions, calculations, test IDs, role checks and server-authoritative behaviour.

## M3 — Foundation implementation started
- Added PRIMUS design tokens and reusable shell styles in `apps/web/app/globals.css`.
- Refreshed shared `Panel`, `Badge`, `Table`, `Stat`, `Notice`, button and input primitives in `apps/web/components/ui/ui.tsx`.
- Restyled participant and organiser headers/navigation while preserving their server loaders, role gates, realtime providers and existing route contracts.
- Reworked the sign-in presentation and app metadata for PRIMUS.
- Added a participant command-centre introduction and an organiser event-control introduction.
- Kept the projector stage and its read-only architecture separate.
- No backend, database, engine, authentication or server-action logic was changed.

## M2 — Completed alignment
See [PRIMUS_PRODUCT_ALIGNMENT.md](docs/PRIMUS_PRODUCT_ALIGNMENT.md).

The document contains:
- Participant journey and current route mapping.
- Organiser journey and current route mapping.
- Separate projector strategy.
- Visual thesis and shared-shell principles.
- Existing route/behaviour preservation rules.
- Backend dependency register for phases, tracks, submissions, rescue, trading, judging, results, access, roles, realtime and display.
- Frontend implementation sequence and definition of done.

## Decisions
1. The user confirmed this repository is the intended codebase. We will adapt the existing application into the PRIMUS experience; we will not search for another repository.
2. Backend development is ongoing. Frontend work will use existing server-provided data and agreed contracts; it will not invent or simulate missing backend functionality.
3. Preserve existing server-side authority, database contracts, RLS, audit trails, role gates, route contracts and functional tests.
4. The visual redesign can proceed independently on the working branch. Any required game-rule/backend changes must be raised as explicit integration dependencies.
5. Draft PR #1 is open against `claude/market-simulation-platform-9rk357`; it is not merged. The working branch remains the integration source.

## Environment limitation
The current GitHub-connected workflow can inspect and commit repository files, but does not provide a local Node/Postgres/Supabase/browser runtime. Do not claim tests or builds pass until they are run in a real development environment.

## Next
The frontend implementation is staged for local QA. The GitHub-connected environment cannot run Node, Postgres, Supabase or a browser, and GitHub currently reports no workflow runs or status checks for this PR. Run the M8 checks locally before merging. Do not change legacy domain mechanics until the backend team confirms canonical PRIMUS contracts.
