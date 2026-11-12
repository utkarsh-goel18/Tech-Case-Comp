import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/auth/viewer";
import { safeNext } from "@/lib/auth/routes";
import { LoginForm } from "./login-form";
import { MatrixRain } from "./matrix-rain";

export const metadata: Metadata = { title: "Sign in · PRIMUS" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : undefined;
  const viewer = await getViewer();
  if (viewer) redirect(safeNext(nextPath, viewer.role));

  return (
    <main className="primus-login primus-login-grid matrix-login min-h-dvh">
      <MatrixRain />
      <div className="matrix-scanlines" aria-hidden="true" />
      <div className="matrix-login-shell">
        <div className="matrix-login-topline">
          <span className="matrix-live-dot" /> PRIMUS NETWORK <span className="matrix-topline-divider">/</span> SECURE ACCESS
          <span className="matrix-topline-right">SYSTEM ONLINE · 2026</span>
        </div>
        <section className="matrix-login-layout">
          <div className="matrix-login-brand">
            <p className="matrix-eyebrow"><span /> THE GAME IS LIVE</p>
            <div className="matrix-logo-stage" aria-label="PRIMUS">
              <Image src="/primus-logo-light.svg" alt="PRIMUS" width={520} height={190} priority className="matrix-logo matrix-logo-main" />
              <Image src="/primus-logo-light.svg" alt="" width={520} height={190} aria-hidden="true" className="matrix-logo matrix-logo-glitch matrix-logo-glitch-a" />
              <Image src="/primus-logo-light.svg" alt="" width={520} height={190} aria-hidden="true" className="matrix-logo matrix-logo-glitch matrix-logo-glitch-b" />
            </div>
            <h1 className="matrix-hero-title">WHERE EVERY<br /><span>DECISION CONNECTS.</span></h1>
            <p className="matrix-hero-copy">Three tracks. One market. Every move changes the game.</p>
            <div className="matrix-system-readout">
              <span><i /> MARKET SIMULATION</span>
              <span>PRIMUS // 26</span>
            </div>
          </div>
          <div className="matrix-auth-wrap">
            <div className="matrix-auth-card">
              <div className="matrix-auth-card-top">
                <span className="matrix-auth-index">01 / AUTHENTICATION</span>
                <span className="matrix-lock"><i /> ENCRYPTED</span>
              </div>
              <div className="matrix-terminal-prompt">&gt; wake up, trader<span className="matrix-cursor">_</span></div>
              <h2>Enter the simulation<span className="matrix-title-period">.</span></h2>
              <p className="matrix-auth-description">Sign in with the credentials issued on your team card.</p>
              <LoginForm next={nextPath} />
              <div className="matrix-auth-foot"><span>ACCESS RESTRICTED</span><span>AUTH NODE 01</span></div>
            </div>
            <p className="matrix-help-line">HAVING TROUBLE? CONTACT YOUR EVENT ORGANISER.</p>
          </div>
        </section>
        <footer className="matrix-login-footer">
          <span>THAPAR VENTURE CLUB <b>×</b> SATURNALIA</span>
          <span>ALL SYSTEMS NOMINAL <i /></span>
        </footer>
      </div>
    </main>
  );rt Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/auth/viewer";
import { safeNext } from "@/lib/auth/routes";
import { LoginForm } from "./login-form";
import { MatrixRain } from "./matrix-rain";

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
