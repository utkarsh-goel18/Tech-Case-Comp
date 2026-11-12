import Link from "next/link";
import { BOOK_KINDS, BOOK_TITLES, type BookKind } from "@/lib/team/market";

const tab = (active: boolean) =>
  `whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
    active ? "border border-[#00e676] bg-[#00e676] text-[#001b0c]" : "border border-[#414141] bg-[#252525] text-[#bdbdbd] hover:border-[#666] hover:bg-[#303030] hover:text-white"
  }`;

/** The market's views: the prices, then each book that is public now (the row wraps on a phone). */
export function BookTabs({ open, current }: { open: readonly BookKind[]; current: BookKind | "PRICES" }) {
  return (
    <nav aria-label="Market views" className="flex flex-wrap gap-2">
      <Link href="/team/market" aria-current={current === "PRICES" ? "page" : undefined} className={tab(current === "PRICES")}>
        Prices
      </Link>
      {BOOK_KINDS.filter((k) => open.includes(k)).map((k) => (
        <Link key={k} href={`/team/market/book?type=${k}`} aria-current={k === current ? "page" : undefined} className={tab(k === current)}>
          {BOOK_TITLES[k]}
        </Link>
      ))}
    </nav>
  );
}
