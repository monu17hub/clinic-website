import React from "react";
import { Link } from "react-router-dom";
import { clinicInfo } from "../lib/clinicInfo";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ffffff_0,transparent_35%),radial-gradient(circle_at_80%_40%,#38bdf8_0,transparent_40%)]" />
        <div className="relative p-7 sm:p-10 flex flex-col md:flex-row gap-8 md:items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-sm text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Same-day appointments available (subject to availability)
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              {clinicInfo.name}
            </h1>
            <p className="mt-3 text-slate-200 max-w-xl">
              Book a visit with our general doctor. Enter your details and pick a
              time slot that works for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
              >
                Book an appointment
              </Link>
              <a
                href="tel:5551234567"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300/40 px-4 py-2 font-semibold text-slate-100 hover:bg-white/10 transition-colors"
              >
                Call: {clinicInfo.phone}
              </a>
            </div>
          </div>

          <div className="md:w-[360px]">
            <div className="rounded-xl bg-white/10 border border-white/10 p-5 backdrop-blur">
              <div className="text-sm text-slate-200">Your doctor</div>
              <div className="mt-1 text-xl font-bold">{clinicInfo.doctor.name}</div>
              <div className="mt-1 text-slate-200">
                {clinicInfo.doctor.specialty}
              </div>
              <div className="mt-3 text-sm text-slate-200">
                {clinicInfo.doctor.qualifications}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-200">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-300">●</span>
                  <span>{clinicInfo.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-300">●</span>
                  <span>{clinicInfo.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Timings</h2>
          <div className="mt-4 space-y-2">
            {clinicInfo.timings.map((t) => (
              <div
                key={t.day}
                className="flex items-center justify-between rounded-lg border px-4 py-2"
              >
                <div className="font-medium text-slate-800">{t.day}</div>
                <div className="text-slate-600">{t.hours}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            What to expect
          </h2>
          <div className="mt-4 space-y-3 text-slate-700">
            <p>
              Your appointment request will be recorded immediately. The clinic
              will review availability and confirm if needed.
            </p>
            <p>
              Please arrive a few minutes early with any relevant medical
              history.
            </p>
            <div className="rounded-xl bg-slate-50 border p-4 text-sm text-slate-700">
              Note: For emergencies, seek immediate medical help. This portal
              is not for urgent or emergency situations.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

