import Image from "next/image";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getViewer } from "@/lib/auth/viewer";
import { safeNext } from "@/lib/auth/routes";
import { LoginForm } from "./login-form";
import { MatrixRain } from "./matrix-rain";
import styles from "./matrix-login.module.css";

export const metadata: Metadata = { title: "Enter PRIMUS · Market Simulation" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : undefined;
  const viewer = await getViewer();
  if (viewer) redirect(safeNext(nextPath, viewer.role));

  return (
    <main className={styles["matrix-cinematic-login"]}>
      <MatrixRain />
      <div className="matrix-cinematic-vignette" aria-hidden="true" />
      <div className="matrix-cinematic-scanlines" aria-hidden="true" />

      <section className={styles["matrix-logo-intro"]} aria-hidden="true">
        <div className={styles["matrix-intro-sweep"]} />
        <div className={styles["matrix-intro-noise"]} />
        <Image
          src="/primus-logo-white.png"
          alt=""
          width={760}
          height={275}
          priority
          className={styles["matrix-intro-wordmark"]}
        />
        <p className={styles["matrix-intro-status"]}>PRIMUS NETWORK <span>//</span> INITIALISING</p>
      </section>

      <section className={styles["matrix-login-stage"]} aria-label="PRIMUS sign in">
        <div className={styles["matrix-login-card"]}>
          <div className={styles["matrix-card-topline"]}>
            <span><i /> SECURE ACCESS NODE</span>
            <span>PRIMUS · 2026</span>
          </div>
          <div className={styles["matrix-card-heading"]}>
            <p className={styles["matrix-terminal-prompt"]}>&gt; wake up, trader<span className={styles["matrix-cursor"]}>_</span></p>
            <h1>Enter the simulation<span>.</span></h1>
            <p>Sign in with the credentials issued on your team card.</p>
          </div>
          <LoginForm next={nextPath} />
          <div className={styles["matrix-card-footer"]}>
            <span>ENCRYPTED CONNECTION</span>
            <span>CONTACT ORGANISER FOR SUPPORT</span>
          </div>
        </div>
        <p className={styles["matrix-stage-caption"]}><i /> THE GAME IS LIVE <span>·</span> EVERY DECISION CONNECTS</p>
      </section>
    </main>
  );
}
