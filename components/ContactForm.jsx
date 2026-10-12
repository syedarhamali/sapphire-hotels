"use client";

import { useState } from "react";
import { hotel } from "@/lib/data";

const fieldClasses =
  "min-h-[52px] rounded-2xl border border-sand bg-paper px-4 text-base text-ink transition-colors focus:border-sapphire-400";

export function ContactForm() {
  const [error, setError] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Add your name, email and a message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    const body = `Name: ${name}\nTelephone: ${phone || "Not given"}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${hotel.email}?subject=${encodeURIComponent(`Enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="ring-gradient grid gap-3 rounded-[32px] p-6 shadow-soft">
      <h2 className="text-xl">Send an enquiry</h2>
      <p className="text-sm text-muted">
        This opens an email to the hotel in your mail app. It is not sent until you send that email.
      </p>
      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wide text-sapphire-600">
        Name
        <input name="name" type="text" autoComplete="name" required className={fieldClasses} />
      </label>
      <div className="grid gap-3">
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wide text-sapphire-600">
          Telephone
          <input name="phone" type="tel" autoComplete="tel" className={fieldClasses} />
        </label>
        <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wide text-sapphire-600">
          Email
          <input name="email" type="email" autoComplete="email" required className={fieldClasses} />
        </label>
      </div>
      <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wide text-sapphire-600">
        Message
        <textarea name="message" rows={6} required className={`${fieldClasses} resize-y py-2.5`} />
      </label>
      {error ? (
        <p role="alert" className="font-semibold text-danger">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-sapphire mt-1">
        Write email
      </button>
    </form>
  );
}
