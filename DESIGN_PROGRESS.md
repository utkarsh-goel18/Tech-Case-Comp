# PRIMUS Frontend Redesign — Progress

## Project rules
- Work only in `redesign/primus-frontend`; never push to `main`.
- Fork `utkarsh-goel18/Tech-Case-Comp` is the source of truth.
- PRIMUS Team Guide is authoritative for PRIMUS mechanics; the older market-simulation demo is visual reference only.
- Do not change `packages/engine`, `supabase/**`, auth, RLS, RPC contracts, or server actions without an explicit scope decision.
- Do not present old-game mechanics as PRIMUS functionality.
- Keep `/display` as its own surface.

## Status
- [x] M0: Scope and repository connection
- [x] M1: Initial GitHub source audit (read-only; remote files inspected)
- [ ] M1b: Resolve product/backend compatibility before frontend implementation
- [ ] M2: Design system and shared shells
- [ ] M3: Participant overview and editors
- [ ] M4: Market/trading experience
- [ ] M5: Organiser experience
- [ ] M6: Projector experience
- [ ] M7: Responsive, accessibility and regression verification

## M1 — Verified repository findings

### Repository state
- Default branch: `claude/market-simulation-platform-9rk357`.
- Working branch created: `redesign/primus-frontend`, based on the default branch.
- Repository is a pnpm monorepo; root package is `market-sim`.
- Frontend: `apps/web`; Next.js 16.4.3, React 19.3.0, TypeScript, Tailwind 4.
- Root scripts: `pnpm test` runs workspace tests then DB tests; `pnpm typecheck` runs workspace typechecks and scripts typecheck. Web scripts include `test`, `typecheck`, `build`, `lint`, `e2e`.
- Tests/builds have NOT been executed in this remote GitHub-only audit.

### Critical product mismatch — verified
The current source is still the older Market Simulation game, not a PRIMUS-aligned implementation:
- `README.md` describes Product/Consulting/Finance tracks, squads, IPO, short/cover orders, advisor fees and flash bulletin.
- `PLAN.md` defines legacy phase codes including `SQUAD_DRAW`, `IPO`, `ROUNDS_1_4`, `RESCUE_1/2`, `ROUNDS_13_21`, and legacy order types `SHORT/COVER`.
- Participant routes include `/team/squad/**`, `/team/trade/ipo/**`, `/team/calls/**`, `/team/rescue/**`, and `/team/earnings`.
- Trading UI in `apps/web/app/team/trade/page.tsx` describes IPO, shorting and covering; `ticket.tsx` imports `ORDER_TYPES` and `OrderType` from the existing engine.
- Team layout currently shows track, squad channel and legacy market state.
- Admin UI and engine phase model also use legacy concepts.
- This is not a cosmetic mismatch. The PRIMUS workflow discussed in the brief (PRD build, crisis response/rescue, Q&A, virtual-cash trading with PRIMUS restrictions) cannot be assumed to be supported by the current backend.
- No legacy mechanics have been removed or changed.

### Frontend route inventory (verified from App Router tree)
- Public/auth: `/`, `/login`.
- Team: `/team`; `/team/squad` and nested `pitch`, `plan`, `problem`, `flash`; `/team/rescue`; `/team/qa`; `/team/calls`; `/team/chat`; `/team/market`, `/team/market/[ticker]`, `/team/market/book`; `/team/trade`, `/team/trade/ipo`, `/team/trade/positions`, `/team/trade/history`; `/team/ledger`; `/team/judging`; `/team/earnings`; `/team/bulletins`.
- Admin: `/admin`; `/admin/[slug]`; nested `bulletins`, `chats`, `content`, `exports`, `fairness`, `health`, `judge` (including `calibration`), `ledger` (including `corrections`), `lottery` (including `record`), `rounds`.
- Display: `/display`; `/display/[slug]`.
- API routes include `/api/judge/work`, `/api/lottery-record`, `/api/rankings`; admin also has export and lottery-record route handlers.

### Shared UI and styling (verified)
- Root stylesheet: `apps/web/app/globals.css`; currently light defaults (`#fff` / slate foreground), Tailwind 4 import and system sans/mono stacks.
- Root layout: `apps/web/app/layout.tsx`.
- Team shell: `apps/web/app/team/layout.tsx`; horizontal section nav in `nav.tsx`; `action-bar.tsx`, `alerts.tsx`, `phase-end.tsx`.
- Admin shell: `apps/web/app/admin/[slug]/layout.tsx`; horizontal nav in `nav.tsx`.
- Display shell is separate under `apps/web/app/display/**`.
- UI primitives: `apps/web/components/ui/ui.tsx`, `action.tsx`, `countdown.tsx`, `line-chart.tsx`, `realtime-dot.tsx`, `result-message.tsx`.
- Team home is task/deadline oriented in `apps/web/app/team/page.tsx`; current layout uses `Panel` and `Stat` primitives.
- Trading ticket is an existing functional client component in `apps/web/app/team/trade/ticket.tsx`; preserve its action/nonce/validation flow if the product scope retains it.

### Test coverage inventory (verified from tree; not executed)
- Playwright specs exist under `apps/web/e2e/`: admin bulletins, calibration, content, exports, fairness, health, judge, ledger, lottery, phase, rounds; display awards, board, frame, takeovers; lottery record; smoke; team calls, chat, feedback, home, IPO, judging, layout, market, plan, QA, rescue, squad, trade.
- Unit tests include team judging markdown, UI action helpers, and judge-work route tests.
- Test selectors are embedded in route/components (examples: `team-phase`, `team-cash`, `home-idle`, `home-squad`, `home-company`, `trading-notice`, `collateral-blocked`, `display-paused`). Full selector inventory and test execution remain pending.

## Decisions / blockers
1. Do not start a PRIMUS visual rewrite against this branch until the product/backend mismatch is resolved.
2. We need to establish whether this repository is intentionally the old engine to be adapted, or whether a newer PRIMUS backend branch exists.
3. If this is the intended repo, a frontend-only redesign cannot implement PRIMUS mechanics that the current engine/database do not support. That would require a separately scoped backend/game-engine migration and cannot be hidden inside a styling task.
4. Remote GitHub API access allows source inspection and file/branch commits, but does not provide a local Node environment, browser, Supabase instance or Playwright runtime. Typecheck/build/e2e results must be run in a real development environment before declaring them passing.

## Next step
Confirm the intended product boundary: adapt this legacy game into PRIMUS (which requires backend/game-rule work), or locate the newer PRIMUS-aligned repository/branch. Until then, preserve the current application and do not delete legacy flows.
