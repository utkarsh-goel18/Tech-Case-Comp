import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/auth/viewer";
import { safeNext } from "@/lib/auth/routes";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in · PRIMUS" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : undefined;
  const viewer = await getViewer();
  if (viewer) redirect(safeNext(nextPath, viewer.role));

  return (
    <main className="primus-login primus-login-grid flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md border border-[#3a4b40] bg-[#f7f8f5] p-7 shadow-2xl sm:p-9">
        <div className="mb-8 flex items-center gap-3"><div className="min-w-0"><Image src="/primus-logo-light.svg" alt="PRIMUS" width={190} height={72} priority className="primus-login-logo" /><p className="primus-kicker mt-3">Where Every Decision Connects · 2026</p></div></div>
        <p className="mb-7 mt-1 max-w-xs text-sm leading-relaxed text-[#59665e]">Enter the credentials issued by the organisers to access your PRIMUS competition workspace.</p>
        <LoginForm next={nextPath} />
      </div>
    </main>
  );
}
