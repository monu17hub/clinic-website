import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type AppointmentRow = {
  id: string;
  patient_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
};

export default function AdminPage() {
  const requiredPasscode = useMemo(
    () => (import.meta.env.VITE_ADMIN_PASSCODE as string | undefined) ?? "",
    [],
  );

  const [passcode, setPasscode] = useState("");
  const [authorized, setAuthorized] = useState(() => !requiredPasscode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: selectError } = await supabase
        .from("appointments")
        .select(
          "id,patient_name,phone,appointment_date,appointment_time,created_at",
        )
        .order("created_at", { ascending: false });

      if (selectError) {
        setError(selectError.message);
        return;
      }

      setAppointments((data ?? []) as AppointmentRow[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load appointments.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authorized) return;
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">
        Admin - Appointments
      </h1>
      <p className="mt-2 text-slate-600">
        View appointment requests from the booking form.
      </p>

      {!authorized ? (
        <div className="mt-6 rounded-2xl border bg-white p-6 max-w-md">
          <div className="text-sm font-medium text-slate-800">
            Enter doctor passcode
          </div>
          <div className="mt-3">
            <input
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
              placeholder="Passcode"
              type="password"
            />
          </div>
          {error ? (
            <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          <button
            className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-800 transition-colors"
            onClick={() => {
              const ok = passcode === requiredPasscode;
              if (!ok) {
                setError("Incorrect passcode.");
                return;
              }
              setError(null);
              setAuthorized(true);
            }}
          >
            Unlock admin
          </button>
          <div className="mt-3 text-xs text-slate-500">
            This is a lightweight gate for convenience. For production, lock
            access with Supabase RLS and authenticated roles.
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <div className="text-sm text-slate-600">
              Total requests:{" "}
              <span className="font-semibold text-slate-900">
                {appointments.length}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                disabled={loading}
                onClick={fetchAppointments}
                className="rounded-lg border px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors disabled:opacity-60"
              >
                Refresh
              </button>
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="rounded-2xl border bg-white overflow-hidden">
            <div className="max-h-[520px] overflow-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Requested</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id} className="border-t text-sm">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {a.patient_name}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{a.phone}</td>
                      <td className="px-4 py-3 text-slate-700">
                        {a.appointment_date}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {a.appointment_time}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {new Date(a.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && !loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-slate-500"
                      >
                        No appointments yet.
                      </td>
                    </tr>
                  ) : null}
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-slate-500"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

