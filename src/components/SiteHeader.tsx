import React from "react";
import { Link } from "react-router-dom";

type Props = {
  activePath: string;
};

const NavLink = ({
  to,
  label,
  activePath,
}: {
  to: string;
  label: string;
  activePath: string;
}) => {
  const isActive = activePath === to || (to !== "/" && activePath.startsWith(to));

  return (
    <Link
      to={to}
      className={[
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")}
    >
      {label}
    </Link>
  );
};

export default function SiteHeader({ activePath }: Props) {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">
            MD
          </div>
          <div className="leading-tight">
            <div className="text-sm text-slate-500">General Doctor</div>
            <div className="text-lg font-semibold text-slate-900">
              Clinic Appointment Portal
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink to="/" label="Home" activePath={activePath} />
          <NavLink to="/appointment" label="Book Appointment" activePath={activePath} />
          <NavLink to="/admin" label="Admin" activePath={activePath} />
        </nav>
      </div>
    </header>
  );
}

