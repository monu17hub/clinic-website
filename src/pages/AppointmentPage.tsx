import React, { useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { clinicInfo } from "../lib/clinicInfo";

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function AppointmentPage() {
  const initialDate = useMemo(() => todayISO(), []);

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(initialDate);
  const [appointmentTime, setAppointmentTime] = useState(
    clinicInfo.appointmentSlots[0] ?? "09:00",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    if (!patientName.trim()) return "Please enter your name.";

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return "Please enter a valid phone number.";

    if (!appointmentDate) return "Please select a date.";
    if (!appointmentTime) return "Please select a time slot.";

    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationMessage = validate();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase
        .from("appointments")
        .insert({
          patient_name: patientName.trim(),
          phone: phone.trim(),
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
        });

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setSuccess("Appointment request received. Thank you!");
      setPatientName("");
      setPhone("");
      setAppointmentDate(initialDate);
      setAppointmentTime(clinicInfo.appointmentSlots[0] ?? "09:00");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while booking.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">
            Book an appointment
          </h1>
          <p className="mt-2 text-slate-600">
            Fill in the form below to request a time slot.
          </p>

          <div className="mt-6 rounded-2xl border bg-white p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-800">
                  Patient name
                </label>
                <input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="e.g., Sarah Johnson"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-800">
                  Phone number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="e.g., (555) 123-4567"
                  autoComplete="tel"
                  required
                />
                <div className="mt-1 text-xs text-slate-500">
                  We'll use this to contact you if needed.
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-800">
                    Date
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-800">
                    Time slot
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900/20"
                    required
                  >
                    {clinicInfo.appointmentSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              ) : null}

              <button
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-800 transition-colors disabled:opacity-60"
              >
                {loading ? "Booking..." : "Request appointment"}
              </button>

              <div className="text-xs text-slate-500">
                By booking, you agree that the clinic may contact you using the
                provided phone number.
              </div>
            </form>
          </div>
        </div>

        <aside className="lg:w-[360px] space-y-4">
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Doctor</h2>
            <div className="mt-2 font-semibold text-slate-800">
              {clinicInfo.doctor.name}
            </div>
            <div className="text-slate-600 mt-1">{clinicInfo.doctor.specialty}</div>
            <div className="text-slate-600 mt-2 text-sm">
              {clinicInfo.doctor.qualifications}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Clinic contact</h2>
            <div className="mt-2 text-slate-700 text-sm">{clinicInfo.address}</div>
            <a
              className="mt-2 block text-slate-700 text-sm hover:underline"
              href="tel:5551234567"
            >
              {clinicInfo.phone}
            </a>
            <a
              className="mt-1 block text-slate-700 text-sm hover:underline break-all"
              href={`mailto:${clinicInfo.email}`}
            >
              {clinicInfo.email}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

