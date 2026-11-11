import type { Metadata } from "next";
import Link from "next/link";
import { PHASE_LABELS } from "@msim/engine";
import { currentViewer } from "@/lib/auth/viewer";
import { loadAdminEvent, loadEventStatus } from "@/lib/admin/event";
import { ClockProvider } from "@/lib/live/clock";
import { EventChannel } from "@/lib/live/channel";
import { Heartbeat } from "@/lib/live/heartbeat";
import { FeedbackBar, FeedbackProvider } from "@/lib/live/feedback";
import { SignOutButton } from "@/components/sign-out-button";
import { Badge } from "@/components/ui/ui";
import { ServerClock } from "@/components/ui/countdown";
import { RealtimeDot } from "@/components/ui/realtime-dot";
import { RouteHeading } from "@/components/route-heading";
import { AdminNav } from "./nav";

export const metadata: Metadata = { title: { template: "%s · PRIMUS Control Room", default: "PRIMUS Control Room" } };

// Every admin page of one event: header with the phase, trading state and server clock; the section tabs; the
// event's realtime channel (pages refresh on every broadcast) and the heartbeat (an organiser's console also runs
// the game clock as a backup).
export default async function EventAdminLayout({ children, params }: LayoutProps<"/admin/[slug]">) {
  const { slug } = await params;
  const [viewer, event] = await Promise.all([currentViewer(), loadAdminEvent(slug)]);
  const status = await loadEventStatus(event.id);
  const organiser = viewer!.role === "ORGANISER";
  return (
    <ClockProvider serverTime={status.server_time} pausedAt={status.paused ? status.paused_at : null}>
      <EventChannel eventId={event.id} staff>
        <FeedbackProvider>
        <Heartbeat eventId={event.id} area="admin" tick={organiser} />
        <div className="primus-shell">
          <a className="primus-skip-link" href="#main-content">Skip to content</a>
          <div className="primus-topline" />
          <header className="primus-header">
            <div className="primus-header-inner flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/admin" className="text-sm text-[#aeb9b1] hover:text-white">
                  Events
                </Link>
                <div className="flex items-center gap-2"><span className="primus-brand-mark">P.</span><p className="text-sm font-bold tracking-wide text-[#f4f6f1]">PRIMUS <span className="font-normal text-[#aeb9b1]">/ {event.name}</span></p></div>
                {event.is_rehearsal ? <Badge tone="violet">Rehearsal ×{event.clock_speed}</Badge> : <Badge tone="blue">Live</Badge>}
                <Badge tone="slate">{PHASE_LABELS[status.phase]}</Badge>
                <Badge tone={status.trading === "OPEN" ? "green" : status.trading === "PAUSED" ? "amber" : "slate"}>{status.trading}</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RealtimeDot />
                <ServerClock className="text-base font-semibold" />
                <span className="primus-kicker text-[#91a097]">IST</span>
                <span className="hidden text-[#c1cbc3] sm:inline">
                  {viewer!.displayName} · {organiser ? "Organiser" : "Fairness officer"}
                </span>
                <SignOutButton />
              </div>
            </div>
            <AdminNav slug={slug} fairness={viewer!.role === "FAIRNESS"} />
          </header>
          <FeedbackBar className="mx-auto max-w-[1440px] px-4 pt-4" />
          <main id="main-content" className="primus-main"><RouteHeading />{children}</main>
        </div>
      </FeedbackProvider>
      </EventChannel>
    </ClockProvider>
  );
}
