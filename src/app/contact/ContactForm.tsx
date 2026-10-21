"use client";

import { useActionState, useEffect, useRef } from "react";

import { type ContactState, sendMessage } from "./actions";

const initial: ContactState = { status: "idle" };
const fields = ["name", "email", "message"] as const;

const field =
  "mt-2 w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-ink focus:outline-none aria-invalid:border-red-700";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const first = fields.find((name) => state.errors?.[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
  }, [state]);

  if (state.status === "sent" || state.status === "demo") {
    return (
      <div role="status" className="rounded-3xl bg-surface p-8">
        <p className="font-display text-3xl text-ink">Message received</p>
        <p className="mt-3 text-body">{state.message}</p>
      </div>
    );
  }

  const error = (name: "name" | "email" | "message") => state.errors?.[name];

  return (
    <form ref={formRef} action={action} noValidate className="space-y-6">
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="text-sm text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          defaultValue={state.values?.name}
          aria-invalid={Boolean(error("name"))}
          aria-describedby={error("name") ? "name-error" : undefined}
          className={field}
        />
        {error("name") && (
          <p id="name-error" className="mt-2 text-sm text-red-700 dark:text-red-400">
            {error("name")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.values?.email}
          aria-invalid={Boolean(error("email"))}
          aria-describedby={error("email") ? "email-error" : undefined}
          className={field}
        />
        {error("email") && (
          <p id="email-error" className="mt-2 text-sm text-red-700 dark:text-red-400">
            {error("email")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm text-ink">
          About the project
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={state.values?.message}
          aria-invalid={Boolean(error("message"))}
          aria-describedby={error("message") ? "message-error" : undefined}
          className={field}
        />
        {error("message") && (
          <p id="message-error" className="mt-2 text-sm text-red-700 dark:text-red-400">
            {error("message")}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
