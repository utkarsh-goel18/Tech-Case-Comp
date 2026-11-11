"use client";

import { usePathname } from "next/navigation";

type Copy = { eyebrow: string; title: string; description: string };
const TEAM: Record<string, Copy> = {
  "/team/squad": { eyebrow: "Participant / Workspace", title: "Your squad", description: "Your team structure, company identity, assigned case and submission progress." },
  "/team/squad/problem": { eyebrow: "Participant / Workspace", title: "Case brief", description: "Review the available case information and your team's current selection." },
  "/team/squad/pitch": { eyebrow: "Participant / Submission", title: "Company proposition", description: "Work on the submission assigned to your team and track its saved and submitted versions." },
  "/team/squad/plan": { eyebrow: "Participant / Submission", title: "Rescue plan", description: "Coordinate the plan with your squad and keep the submitted version up to date." },
  "/team/squad/flash": { eyebrow: "Participant / Submission", title: "Flash response", description: "Complete the time-sensitive response while the submission window is open." },
  "/team/rescue": { eyebrow: "Participant / Coordination", title: "Rescue desk", description: "Review the current crisis, team responsibilities and any open decisions." },
  "/team/calls": { eyebrow: "Participant / Coordination", title: "Company calls", description: "Review the calls and decisions available to your team." },
  "/team/qa": { eyebrow: "Participant / Communication", title: "Public Q&A", description: "Read the public questions and responses, and contribute when your role allows." },
  "/team/chat": { eyebrow: "Participant / Communication", title: "Squad channel", description: "Coordinate with the other teams in your squad." },
  "/team/bulletins": { eyebrow: "Official communication", title: "Event bulletins", description: "The official announcements published by the organisers." },
  "/team/market": { eyebrow: "Market / Overview", title: "Company board", description: "Browse listed companies, their prices and the latest cleared movement." },
  "/team/trade": { eyebrow: "Market / Orders", title: "Trading desk", description: "Review your available funds and manage orders during an open round." },
  "/team/trade/ipo": { eyebrow: "Market / Primary issue", title: "IPO desk", description: "Review the primary issue information and available actions." },
  "/team/trade/positions": { eyebrow: "Market / Portfolio", title: "Your positions", description: "Track holdings, portfolio value and profit or loss using the latest available prices." },
  "/team/trade/history": { eyebrow: "Market / Records", title: "Order history", description: "Review submitted orders, fills and their final status." },
  "/team/ledger": { eyebrow: "Finance / Records", title: "Public ledger", description: "Review the published event transactions and round-level company totals." },
  "/team/judging": { eyebrow: "Results / Evaluation", title: "Judging", description: "Review the evaluation information currently released to participants." },
  "/team/earnings": { eyebrow: "Results / Performance", title: "Company performance", description: "Review the performance information currently available to your team." },
};
const ADMIN: Record<string, Copy> = {
  "/": { eyebrow: "Operations / Overview", title: "Event overview", description: "A live overview of this event, its current phase and the organiser tools available to your role." },
  "/phase": { eyebrow: "Operations / Schedule", title: "Phase control", description: "Control the event state and schedule using server-authoritative actions." },
  "/lottery": { eyebrow: "Operations / Allocation", title: "Team allocation", description: "Manage the event's allocation and draw workflow." },
  "/rounds": { eyebrow: "Operations / Market", title: "Round control", description: "Monitor and manage the configured market rounds." },
  "/judge": { eyebrow: "Evaluation / Judging", title: "Judging desk", description: "Review evaluation progress and the tools available to judges." },
  "/bulletins": { eyebrow: "Communication", title: "Bulletins", description: "Prepare and publish official event announcements." },
  "/content": { eyebrow: "Event configuration", title: "Content library", description: "Manage the event content surfaced to participants and the display." },
  "/ledger": { eyebrow: "Finance / Audit", title: "Ledger", description: "Inspect event transactions and authorised corrections." },
  "/fairness": { eyebrow: "Governance / Oversight", title: "Fairness review", description: "Review fairness signals and the records available to authorised officers." },
  "/chats": { eyebrow: "Communication / Oversight", title: "Squad conversations", description: "Review squad communication within the access permissions of your role." },
  "/exports": { eyebrow: "Operations / Reporting", title: "Exports", description: "Generate the event records available for export." },
  "/health": { eyebrow: "Operations / Monitoring", title: "System health", description: "Review the system and service health signals available to organisers." },
};
function resolve(path: string): Copy | null {
  if (path === "/team") return null;
  if (path.startsWith("/admin/")) {
    const rest = path.replace(/^\/admin\/[^/]+/, "") || "/";
    const key = Object.keys(ADMIN).sort((a,b)=>b.length-a.length).find((x)=>rest === x || rest.startsWith(x + "/"));
    return key ? ADMIN[key]! : null;
  }
  const key = Object.keys(TEAM).sort((a,b)=>b.length-a.length).find((x)=>path === x || path.startsWith(x + "/"));
  return key ? TEAM[key]! : null;
}
export function RouteHeading() {
  const pathname = usePathname();
  const copy = resolve(pathname);
  if (!copy) return null;
  return (
    <section className="mb-6 flex flex-col justify-between gap-3 border-b border-[#cbd4cc] pb-5 sm:flex-row sm:items-end">
      <div>
        <p className="primus-kicker">{copy.eyebrow}</p>
        <h1 className="primus-page-title mt-2">{copy.title}<span className="text-[#8aaa4e]">.</span></h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64716a]">{copy.description}</p>
      </div>
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[.12em] text-[#849087]">PRIMUS / Live workspace</p>
    </section>
  );
}
