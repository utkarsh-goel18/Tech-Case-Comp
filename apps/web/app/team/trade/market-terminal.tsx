"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LineChart } from "@/components/ui/line-chart";
import type { ChartPoint } from "@/lib/chart";
import { money, bp } from "@/lib/format";

export interface MarketInstrument {
  id: string;
  ticker: string;
  name: string;
  price: number | null;
  ipo: number | null;
  changeBp: number | null;
  trend: number[];
}

export function MarketTerminalChart({ instruments }: { instruments: MarketInstrument[] }) {
  const [selected, setSelected] = useState(instruments[0]?.id ?? "");
  const active = instruments.find((item) => item.id === selected) ?? instruments[0] ?? null;
  const points = useMemo<ChartPoint[]>(() => {
    if (!active) return [];
    return active.trend.map((value, index) => ({
      label: index === 0 ? "IPO" : `Market update ${index}`,
      value,
      marker: index === 0 ? "IPO" : null,
    }));
  }, [active]);

  return (
    <section className="finance-market-terminal" aria-label="Live market terminal">
      <div className="finance-terminal-chart">
        <div className="finance-card-head">
          <div>
            <p className="finance-section-label">PRIMUS EXCHANGE · LIVE MARKET</p>
            <h2 className="finance-card-title mt-1">Market overview</h2>
          </div>
          <span className="finance-pill finance-pill-live">Simulation feed</span>
        </div>
        {active ? (
          <div className="finance-chart-content">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-bold tracking-wide text-white">{active.ticker} <span className="font-sans font-normal text-[#929292]">/ {active.name}</span></p>
                <p className="mt-1 font-mono text-3xl font-semibold tracking-tight text-white">{active.price === null ? "—" : money(active.price)}</p>
              </div>
              <div className="text-right">
                <p className="finance-section-label">LAST CLEARED MOVE</p>
                <p className={`mt-1 font-mono text-sm font-semibold ${active.changeBp === null ? "text-[#999]" : active.changeBp >= 0 ? "text-[#00e676]" : "text-[#ff6978]"}`}>
                  {active.changeBp === null ? "—" : bp(active.changeBp)}
                </p>
              </div>
            </div>
            <div className="mt-5 min-h-[220px]">
              {points.length >= 2 ? (
                <LineChart points={points} label={`${active.ticker} market price history`} mainName="Market price" testId="terminal-price-chart" />
              ) : (
                <div className="flex min-h-[210px] items-center justify-center rounded-md border border-dashed border-[#414141] bg-[#181818] px-4 text-center text-sm text-[#929292]">
                  Price history appears here after the first market update.
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-5 border-t border-[#383838] pt-3 text-xs text-[#999]">
              <span>IPO price <strong className="ml-1 font-mono text-[#ddd]">{active.ipo === null ? "—" : money(active.ipo)}</strong></span>
              <span>Market price <strong className="ml-1 font-mono text-white">{active.price === null ? "—" : money(active.price)}</strong></span>
              <Link href={`/team/market/${active.ticker}`} className="ml-auto text-[#00e676] hover:underline">Full instrument details ↗</Link>
            </div>
          </div>
        ) : (
          <div className="p-8 text-sm text-[#999]">No listed instruments yet.</div>
        )}
      </div>
      <aside className="finance-watchlist" aria-label="Market watchlist">
        <div className="finance-card-head">
          <div><p className="finance-section-label">INSTRUMENTS</p><h3 className="finance-card-title mt-1">Watchlist</h3></div>
          <span className="font-mono text-xs text-[#888]">{instruments.length}</span>
        </div>
        <div className="finance-watchlist-items">
          {instruments.map((item) => {
            const activeItem = item.id === active?.id;
            return (
              <button key={item.id} type="button" onClick={() => setSelected(item.id)} aria-pressed={activeItem} className={`finance-watchlist-row ${activeItem ? "is-active" : ""}`}>
                <span className="min-w-0 text-left">
                  <span className="block font-mono text-sm font-bold text-white">{item.ticker}</span>
                  <span className="block max-w-[13rem] truncate text-xs text-[#929292]">{item.name}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-sm text-[#eee]">{item.price === null ? "—" : money(item.price)}</span>
                  <span className={`block font-mono text-[11px] ${item.changeBp === null ? "text-[#888]" : item.changeBp >= 0 ? "text-[#00e676]" : "text-[#ff6978]"}`}>{item.changeBp === null ? "—" : bp(item.changeBp)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </section>
  );
}
