"use client";

import { useActionState, useState } from "react";
import { signIn, type LoginState } from "./actions";

export function LoginForm({ next }: { next?: string }) {
  const [mode, setMode] = useState<"team" | "staff">("team");
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, {});

  const tab = (m: "team" | "staff", label: string) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      aria-pressed={mode === m}
      className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold ${
        mode === m ? "matrix-login-tab-active" : "matrix-login-tab-idle"
      }`}
    >
      {label}
    </button>
  );

  return (
    <form action={action} className="space-y-4">
      <div className="matrix-login-tabs">
        {tab("team", "Team")}
        {tab("staff", "Organiser")}
      </div>
      <input type="hidden" name="mode" value={mode} />
      {next ? <input type="hidden" name="next" value={next} /> : null}

      {mode === "team" ? (
        <label className="matrix-login-field block">
          <span className="text-sm font-medium text-slate-700">Team code</span>
          <input
            name="code"
            defaultValue={mode === "team" ? state.login : undefined}
            required
            autoComplete="username"
            autoCapitalize="characters"
            placeholder="P07"
            className="matrix-login-input mt-1 block w-full"
          />
        </label>
      ) : (
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            name="email"
            type="email"
            defaultValue={mode === "staff" ? state.login : undefined}
            required
            autoComplete="username"
            className="matrix-login-input mt-1 block w-full"
          />
        </label>
      )}

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder={mode === "team" ? "XXXX-XXXX-XXXX" : undefined}
          className="matrix-login-input mt-1 block w-full"
        />
      </label>

      {state.error ? (
        <p role="alert" className="matrix-login-error rounded-md px-3 py-2 text-sm">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="matrix-login-submit primus-button-primary w-full px-4 py-3 text-base disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
