import React from "react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-1 text-sm text-slate-600">
        <div className="font-medium text-slate-800">
          Clinic Appointment Portal
        </div>
        <div>For medical emergencies, call local emergency services.</div>
        <div>© {new Date().getFullYear()}.</div>
      </div>
    </footer>
  );
}

