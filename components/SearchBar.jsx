"use client";

import { useMemo, useState } from "react";
import { bookingUrl } from "@/lib/data";

function todayIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function addDays(iso, days) {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

const field = "flex-1 rounded-[22px] px-5 py-3 transition-colors hover:bg-cream sm:rounded-full";
const label = "block text-[11px] font-bold uppercase tracking-[0.16em] text-sapphire-600";
const input = "w-full border-0 bg-transparent p-0 text-[15px] font-medium text-ink focus:outline-none focus:ring-0";

/** One white capsule: check-in, check-out, guests, and a submit button. */
export function SearchBar({ className = "" }) {
  const today = useMemo(() => todayIso(), []);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState("");

  const minCheckOut = checkIn ? addDays(checkIn, 1) : today;

  function onSubmit(event) {
    event.preventDefault();
    if (!checkIn || !checkOut) {
      setError("Choose a check-in and check-out date.");
      return;
    }
    if (checkOut <= checkIn) {
      setError("Check-out needs to be after check-in.");
      return;
    }
    setError("");
    window.location.assign(bookingUrl({ checkIn, checkOut, guests }));
  }

  return (
    <div className={className}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex w-full flex-col gap-1 rounded-[30px] border border-white/70 bg-white/95 p-2 shadow-lift backdrop-blur-xl sm:flex-row sm:items-stretch sm:rounded-full"
      >
        <label className={`${field} sm:border-r sm:border-sand`}>
          <span className={label}>Check in</span>
          <input
            type="date"
            min={today}
            value={checkIn}
            required
            onChange={(event) => {
              const next = event.target.value;
              setCheckIn(next);
              if (checkOut && next && checkOut <= next) setCheckOut(addDays(next, 1));
            }}
            className={input}
          />
        </label>

        <label className={`${field} sm:border-r sm:border-sand`}>
          <span className={label}>Check out</span>
          <input
            type="date"
            min={minCheckOut}
            value={checkOut}
            required
            onChange={(event) => setCheckOut(event.target.value)}
            className={input}
          />
        </label>

        <label className={field}>
          <span className={label}>Guests</span>
          <select value={guests} onChange={(event) => setGuests(event.target.value)} className={`${input} bg-transparent`}>
            {Array.from({ length: 10 }, (_, index) => {
              const count = index + 1;
              return (
                <option key={count} value={count}>
                  {count} {count === 1 ? "guest" : "guests"}
                </option>
              );
            })}
          </select>
        </label>

        <button type="submit" className="btn btn-sapphire mt-1 h-[58px] shrink-0 gap-2 px-6 sm:mt-0 sm:self-center">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6.2" stroke="currentColor" strokeWidth="1.9" />
            <path d="M18 18 L14 14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
          Check availability
        </button>
      </form>
      {error ? (
        <p role="alert" className="mt-3 px-4 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
