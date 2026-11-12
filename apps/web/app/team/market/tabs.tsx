import Link from "next/link";
import { BOOK_KINDS, BOOK_TITLES, type BookKind } from "@/lib/team/market";

const tab = (active: boolean) =>
  `whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
    active ? "border border-[#b6ff45] bg-[#b6ff45] text-[#101a0b] shadow-[0_0_18px_rgba(182,255,69,0.12)]" : "border border-[#294333] bg-[#101a15] text-[#a9bcae] hover:border-[#527a42] hover:bg-[#17251b] hover:text-[#e5eee8]"
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
