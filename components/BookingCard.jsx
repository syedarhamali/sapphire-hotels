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

const inputClasses =
  "min-h-[52px] rounded-2xl border border-sand bg-paper px-4 text-base font-medium normal-case tracking-normal text-ink transition-colors focus:border-sapphire-400";

export function BookingCard({ heading = "Check availability", id = "booking", className = "", wide = false }) {
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
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className={`ring-gradient relative w-full overflow-hidden rounded-[32px] bg-paper p-5 shadow-soft sm:p-6 ${className}`}
    >
      <div className="mb-4">
        <h2 className="mb-1 text-2xl">{heading}</h2>
        <p className="text-sm text-muted">Search the hotel’s reservation page. No payment is taken here.</p>
      </div>

      <div className={wide ? "grid gap-3 lg:grid-cols-[1fr_1fr_0.8fr_auto] lg:items-end" : "grid gap-3 sm:grid-cols-2"}>
        <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-sapphire-600">
          Check in
          <input
            type="date"
            name="checkIn"
            min={today}
            value={checkIn}
            required
            className={inputClasses}
            onChange={(event) => {
              const next = event.target.value;
              setCheckIn(next);
              if (checkOut && next && checkOut <= next) setCheckOut(addDays(next, 1));
            }}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-sapphire-600">
          Check out
          <input
            type="date"
            name="checkOut"
            min={minCheckOut}
            value={checkOut}
            required
            className={inputClasses}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </label>
        <label className={`flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-sapphire-600 ${wide ? "" : "sm:col-span-2"}`}>
          Guests
          <select name="guests" value={guests} onChange={(event) => setGuests(event.target.value)} className={inputClasses}>
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
        <button type="submit" className={`btn btn-sapphire ${wide ? "w-full lg:w-auto" : "w-full sm:col-span-2"}`}>
          Check availability
        </button>
      </div>

      {error ? (
        <p role="alert" className="relative mt-3 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </form>
  );
}
