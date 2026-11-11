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
- [ ] M3: Design system and shared shells
- [ ] M4: Participant experience
- [ ] M5: Market/trading experience
- [ ] M6: Organiser experience
- [ ] M7: Projector experience
- [ ] M8: Responsive, accessibility and regression verification

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
5. No PR has been opened and nothing has been merged into the default branch.

## Environment limitation
The current GitHub-connected workflow can inspect and commit repository files, but does not provide a local Node/Postgres/Supabase/browser runtime. Do not claim tests or builds pass until they are run in a real development environment.

## Next
M3: implement the design foundation and shared participant/organiser shells in place, keeping the display separate. Before changing domain-specific labels, fields or mechanics, obtain the backend team's canonical PRIMUS contracts.
