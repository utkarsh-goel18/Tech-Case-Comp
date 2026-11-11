// Shared presentation primitives. Behaviour and data contracts remain owned by the calling routes.
import type { ReactNode } from "react";

export function Panel({ title, actions, children, className = "" }: { title?: ReactNode; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`primus-panel min-w-0 ${className}`}>
      {title || actions ? (
        <header className="primus-panel-head">
          {title ? <h2 className="primus-panel-title min-w-0 [overflow-wrap:anywhere]">{title}</h2> : <span />}
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </header>
      ) : null}
      <div className="primus-panel-body">{children}</div>
    </section>
  );
}

const TONES = {
  slate: "bg-[#edf0ec] text-[#435149] ring-[#d9dfd9]",
  green: "bg-[#eaf5d9] text-[#35521d] ring-[#cfe4ae]",
  amber: "bg-[#fff4dc] text-[#76500e] ring-[#f1d89c]",
  red: "bg-[#fae9e6] text-[#8c2e27] ring-[#efc3bd]",
  blue: "bg-[#e8f1f4] text-[#285363] ring-[#c8dce2]",
  violet: "bg-[#f0ebf7] text-[#60437d] ring-[#ded0ed]",
} as const;
export type Tone = keyof typeof TONES;

export function Badge({ tone = "slate", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-sm px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[.08em] ring-1 ring-inset ${TONES[tone]}`}>{children}</span>;
}

export function Table({
  head, children, empty, className = "", label,
}: {
  head: ReactNode[]; children: ReactNode; empty?: ReactNode; className?: string; label?: string;
}) {
  const rows = Array.isArray(children) ? children.filter(Boolean) : children;
  const isEmpty = Array.isArray(rows) && rows.length === 0;
  const name = label ?? "Table";
  return (
    <div role="region" aria-label={name} tabIndex={0} className={`overflow-x-auto rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#769d35] ${className}`}>
      <table className="primus-table min-w-full text-sm">
        <thead><tr className="border-b border-[#d9dfd9] text-left">
          {head.map((h, i) => <th key={i} className="whitespace-nowrap px-3 py-3">{h}</th>)}
        </tr></thead>
        <tbody>{rows}</tbody>
      </table>
      {isEmpty ? <p className="px-3 py-5 text-sm text-[#64716a]">{empty ?? "Nothing yet."}</p> : null}
    </div>
  );
}

export function Td({ children, className = "", mono = false }: { children?: ReactNode; className?: string; mono?: boolean }) {
  return <td className={`whitespace-nowrap px-3 py-2 ${mono ? "font-mono tabular-nums" : ""} ${className}`}>{children}</td>;
}

export function Stat({ label, value, hint }: { label: ReactNode; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="primus-stat">
      <div className="primus-stat-label">{label}</div>
      <div className="primus-stat-value">{value}</div>
      {hint ? <div className="mt-1 text-xs leading-relaxed text-[#64716a]">{hint}</div> : null}
    </div>
  );
}

export function Notice({ tone = "slate", children }: { tone?: Tone; children: ReactNode }) {
  return <div className={`rounded-sm px-3 py-2.5 text-sm ring-1 ring-inset ${TONES[tone]}`}>{children}</div>;
}

export const buttonClass = {
  primary: "primus-button-primary rounded-sm px-3.5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50",
  secondary: "rounded-sm bg-white px-3.5 py-2.5 text-sm font-semibold text-[#24312b] ring-1 ring-inset ring-[#b8c3bb] hover:bg-[#f3f6f1] disabled:cursor-not-allowed disabled:opacity-50",
  danger: "rounded-sm bg-[#a7352e] px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-[#8d2d27] disabled:cursor-not-allowed disabled:opacity-50",
} as const;

export const inputClass = "block w-full rounded-sm border border-[#b8c3bb] bg-white px-3 py-2.5 text-sm text-[#151a18] placeholder:text-[#89948d] focus:border-[#769d35] focus:outline-none focus:ring-2 focus:ring-[#c9f36a]/40";
