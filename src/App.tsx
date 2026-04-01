import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import HomePage from "./pages/HomePage";
import AppointmentPage from "./pages/AppointmentPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader activePath={location.pathname} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

