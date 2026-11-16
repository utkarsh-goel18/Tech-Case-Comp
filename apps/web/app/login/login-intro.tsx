"use client";

import { useEffect, useState } from "react";

const GLITCH_LINES = [
  "PRIMUS // SECURE MARKET NETWORK",
  "INITIALISING AUTHENTICATION NODE",
  "ESTABLISHING ENCRYPTED SESSION",
];

export function LoginIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1850);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="mx-login-boot" aria-hidden="true">
      <div className="mx-login-boot-noise" />
      <div className="mx-login-boot-scan" />
      <div className="mx-login-boot-content">
        <div className="mx-login-boot-mark">
          <span className="mx-login-boot-word">PRIMUS</span>
          <span className="mx-login-boot-word mx-login-boot-word--ghost">PRIMUS</span>
        </div>
        <div className="mx-login-boot-rule" />
        <p className="mx-login-boot-status">SYSTEM BOOT <span>///</span> ACCESS NODE ONLINE</p>
        <div className="mx-login-boot-lines">
          {GLITCH_LINES.map((line, index) => (
            <span key={line} style={{ animationDelay: `${0.18 + index * 0.24}s` }}>
              <i>0{index + 1}</i> {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
