"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/team/trade", label: "Orders" },
  { href: "/team/trade/positions", label: "Positions" },
  { href: "/team/trade/history", label: "History" },
  { href: "/team/trade/ipo", label: "IPO" },
] as const;

// The fund's trading views. On a phone the pills wrap onto a second line (never wider than the screen).
export function TradeTabs() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Trading views">
      {TABS.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              active ? "border border-[#00e676] bg-[#00e676] text-[#001b0c]" : "border border-[#414141] bg-[#252525] text-[#bdbdbd] hover:border-[#666] hover:bg-[#303030]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
