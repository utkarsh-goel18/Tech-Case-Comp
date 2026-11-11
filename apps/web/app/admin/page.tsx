import Link from "next/link";
import { PHASE_LABELS, type PhaseCode } from "@msim/engine";
import { currentViewer } from "@/lib/auth/viewer";
import { supabaseServer } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";
import { Badge, Panel } from "@/components/ui/ui";
import { dateTime } from "@/lib/format";

// The events this account can run: the live night and any rehearsal.
export default async function AdminHome() {
  const viewer = (await currentViewer())!;
  const sb = await supabaseServer();
  const { data: events } = await sb
    .from("events")
    .select("slug, name, is_rehearsal, clock_speed, starts_at, current_phase, paused")
    .order("is_rehearsal")
    .order("starts_at");
  return (
    <main className="primus-login min-h-dvh px-4 py-10"><div className="primus-topline -mx-4 -mt-10 mb-8" /><div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between border-b border-[#34423a] pb-5">
        <div><p className="primus-kicker text-[#aeb9b1]">PRIMUS / Operations</p><h1 className="mt-2 text-3xl font-black tracking-[-.05em] text-white">Select event<span className="text-[#c9f36a]">.</span></h1></div>
        <SignOutButton />
      </div>
      <p className="mt-2 text-sm text-[#aeb9b1]">
        {viewer.displayName} · {viewer.role === "FAIRNESS" ? "Fairness officer" : "Organiser"}
      </p>
      <Panel title="Events" className="mt-6">
        {!events?.length ? (
          <p className="text-sm text-slate-600">No event has been seeded yet (see the README, “Seed an event”).</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {events.map((e) => (
              <li key={e.slug}>
                <Link href={`/admin/${e.slug}`} className="flex items-center justify-between gap-3 py-3 hover:bg-[#f1f4ef]">
                  <span>
                    <span className="font-semibold">{e.name}</span>{" "}
                    {e.is_rehearsal ? <Badge tone="violet">Rehearsal ×{e.clock_speed}</Badge> : <Badge tone="blue">Live</Badge>}
                    <span className="block text-sm text-[#64716a]">Starts {dateTime(e.starts_at)} IST</span>
                  </span>
                  <span className="text-right text-sm text-[#24312b]">
                    {PHASE_LABELS[e.current_phase as PhaseCode]}
                    {e.paused ? (
                      <>
                        {" "}
                        <Badge tone="amber">Paused</Badge>
                      </>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div></main>
  );
}
