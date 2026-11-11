import type { Metadata } from "next";
import Link from "next/link";
import { PHASE_LABELS, TRACK_LABELS } from "@msim/engine";
import { loadTeamContext } from "@/lib/team/context";
import { supabaseServer } from "@/lib/supabase/server";
import { clock, money } from "@/lib/format";
import { ClockProvider } from "@/lib/live/clock";
import { EventChannel } from "@/lib/live/channel";
import { SquadChannel } from "@/lib/live/squad-channel";
import { Heartbeat } from "@/lib/live/heartbeat";
import { FeedbackBar, FeedbackProvider } from "@/lib/live/feedback";
import { SignOutButton } from "@/components/sign-out-button";
import { Badge } from "@/components/ui/ui";
import { Countdown, ServerClock } from "@/components/ui/countdown";
import { RealtimeDot } from "@/components/ui/realtime-dot";
import { RouteHeading } from "@/components/route-heading";
import { TeamNav } from "./nav";
import { ActionBar } from "./action-bar";
import { Alerts, SoundToggle } from "./alerts";
import { loadPlanFacts } from "@/lib/team/home-data";
import { homePlan } from "@/lib/team/home";
import { alertTasks, nextAction } from "@/lib/team/alerts";
import { PhaseEnd } from "./phase-end";

export const metadata: Metadata = { title: { template: "%s · Team", default: "Team" } };

// Every team screen (laptop or phone): the team, where the night is (phase and countdown, trading, the open round),
// its cash, the latest bulletin and the sections of its track. The event's realtime channel refreshes the page on
// every broadcast, the squad's channel announces chat messages, and the heartbeat tells the control panel the screen
// is connected.
export default async function TeamLayout({ children }: LayoutProps<"/team">) {
  const ctx = await loadTeamContext();
  const { team, event, status } = ctx;
  // The bar and the alerts are guidance: if the plan cannot be read (say, the database is older than the app), every
  // page still works, without them.
  const plan = await loadPlanFacts(ctx).then(homePlan, (err: unknown) => {
    console.error("team layout: no plan for the bar and alerts:", err);
    return null;
  });
  const next = plan ? nextAction(plan) : null;
  const sb = await supabaseServer();
  const { data: latest } = await sb
    .from("bulletins")
    .select("id, kind, title, published_at")
    .eq("event_id", event.id)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string; kind: string; title: string; published_at: string }>();
  const finance = team.track === "FINANCE";
  return (
    <ClockProvider serverTime={status.server_time} pausedAt={status.paused ? status.paused_at : null}>
      <EventChannel eventId={event.id}>
        <SquadChannel squadId={ctx.squad?.id ?? null}>
        <FeedbackProvider>
        <Heartbeat eventId={event.id} area="team" />
        <div className="primus-shell">
          <a className="primus-skip-link" href="#main-content">Skip to content</a>
          <div className="primus-topline" />
          <header className="primus-header">
            <div className="primus-header-inner flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <Link href="/team" className="primus-brand"><span className="primus-brand-mark">P.</span><span>PRIMUS <span className="font-normal tracking-[.12em] text-[#9eaaa1]">/ TEAM PORTAL</span></span></Link>
                <span className="font-mono text-xs font-bold tracking-wider text-[#c9f36a]">{team.code}</span>
                <Badge tone="slate">{TRACK_LABELS[team.track]}</Badge>
                <span className="hidden truncate text-sm text-[#c1cbc3] sm:inline">{team.name}</span>
                {event.is_rehearsal ? <Badge tone="violet">Rehearsal ×{event.clock_speed}</Badge> : null}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RealtimeDot />
                <SoundToggle />
                <ServerClock className="font-semibold" />
                <SignOutButton />
              </div>
            </div>
            <dl className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-4 gap-y-2 border-t border-[#34423a] px-4 py-3 text-sm text-[#f4f6f1] sm:grid-cols-4">
              <div>
                <dt className="primus-kicker text-[#91a097]">Phase</dt>
                <dd className="font-semibold" data-testid="team-phase">
                  {PHASE_LABELS[status.phase]}
                  <PhaseEnd endsAt={status.phase_ends_at} phase={status.phase} gate={status.gate} next={status.next_phase} />
                </dd>
              </div>
              <div>
                <dt className="primus-kicker text-[#91a097]">Trading</dt>
                <dd>
                  <Badge tone={status.trading === "OPEN" ? "green" : status.trading === "PAUSED" ? "amber" : "slate"}>{status.trading}</Badge>
                  {status.open_round ? (
                    <span className="ml-1 text-[#aeb9b1]">
                      round {status.open_round.number} · <Countdown to={status.open_round.closes_at} passed="clearing" />
                    </span>
                  ) : status.next_round ? (
                    <span className="ml-1 text-slate-600">
                      round {status.next_round.number} at {clock(status.next_round.opens_at)}
                    </span>
                  ) : null}
                </dd>
              </div>
              <div>
                <dt className="primus-kicker text-[#91a097]">Cash</dt>
                <dd className="font-mono font-semibold tabular-nums text-[#c9f36a]" data-testid="team-cash">
                  {money(team.cash)}
                </dd>
              </div>
              {finance ? (
                <div>
                  <dt className="primus-kicker text-[#91a097]">Collateral locked</dt>
                  <dd className="font-mono tabular-nums text-[#f4f6f1]">{money(team.collateral)}</dd>
                </div>
              ) : null}
            </dl>
            <TeamNav track={team.track} />
          </header>
          <ActionBar task={next && next.href ? { title: next.title, href: next.href, linkLabel: next.linkLabel, due: next.due } : null} />
          <Alerts tasks={plan ? alertTasks(plan) : []} track={team.track} teamId={team.id} />
          {status.paused ? (
            <p className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900">
              The event is paused. Deadlines move later by the length of the pause.
            </p>
          ) : null}
          {team.disqualified ? (
            <p className="bg-red-100 px-4 py-2 text-center text-sm font-medium text-red-900">
              Your team has been disqualified by the fairness officer{team.disqualified_reason ? `: ${team.disqualified_reason}` : "."}
            </p>
          ) : null}
          {latest ? (
            <Link
              href="/team/bulletins"
              className="mx-auto block max-w-5xl px-4 pt-3 text-sm [overflow-wrap:anywhere]"
              data-testid="latest-bulletin"
            >
              <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">{latest.kind}</span>{" "}
              <span className="font-mono text-xs text-slate-500">{clock(latest.published_at)}</span>{" "}
              <span className="font-semibold text-slate-900 underline-offset-2 hover:underline">{latest.title}</span>
            </Link>
          ) : null}
          <FeedbackBar className="mx-auto max-w-[1440px] px-4 pt-3" />
          <main id="main-content" className="primus-main"><RouteHeading />{children}</main>
        </div>
      </FeedbackProvider>
        </SquadChannel>
      </EventChannel>
    </ClockProvider>
  );
}
