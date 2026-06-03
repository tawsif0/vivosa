import React from "react";
import { FiShield, FiUser, FiCheckCircle, FiClock } from "react-icons/fi";

const StatCard = ({ label, value, icon: Icon, tone = "slate" }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {label}
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          tone === "emerald"
            ? "bg-emerald-100 text-emerald-700"
            : tone === "amber"
              ? "bg-amber-100 text-amber-700"
              : tone === "slate"
                ? "bg-slate-100 text-slate-700"
                : "bg-indigo-100 text-indigo-700"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const DashboardHome = ({ user }) => {
  const isAdmin = user?.userType === "admin";

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-linear-to-br from-slate-900 to-slate-700 p-8 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
          Welcome back
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          {user?.name || "User"}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/75">
          {isAdmin
            ? "You are signed in as the primary administrator. Use the dashboard to manage users and platform access."
            : "You are signed in to your account dashboard. You can update your profile and password from Settings."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Account Type"
          value={isAdmin ? "Admin" : "User"}
          icon={isAdmin ? FiShield : FiUser}
          tone="emerald"
        />
        <StatCard
          label="Status"
          value={String(user?.status || "active")}
          icon={FiCheckCircle}
          tone="slate"
        />
        <StatCard
          label="Last Login"
          value={user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Today"}
          icon={FiClock}
          tone="amber"
        />
        <StatCard
          label="Dashboard"
          value="Ready"
          icon={FiCheckCircle}
          tone="indigo"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
