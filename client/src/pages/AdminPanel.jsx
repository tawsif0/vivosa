import React, { useEffect, useMemo, useState } from "react";
import { FiActivity, FiCheckCircle, FiClock, FiFolder, FiMessageSquare, FiRefreshCw, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";
import { fetchAdminOverview } from "../api/dashboard";
import { useAuth } from "../hooks/useAuth";

const StatCard = ({ label, value, icon: Icon, hint, tone = "slate" }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          {label}
        </p>
        <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
      </div>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
          tone === "emerald"
            ? "bg-emerald-100 text-emerald-700"
            : tone === "amber"
              ? "bg-amber-100 text-amber-700"
              : tone === "indigo"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-slate-100 text-slate-700"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const formatCategoryLabel = (key) =>
  String(key || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const SectionCard = ({ title, total, active, categories }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Collection
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-900">{title}</h3>
      </div>
      <div className="rounded-2xl bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
        {total} total
      </div>
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Active
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{active}</p>
      </div>
      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Inactive
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-900">{Math.max(total - active, 0)}</p>
      </div>
    </div>

    {Array.isArray(categories) && categories.length > 0 ? (
      <div className="mt-5 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Category Breakdown
        </p>
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.key}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{formatCategoryLabel(category.key)}</p>
                <p className="text-xs text-slate-500">{category.active} active</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
                {category.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </div>
);

const AdminPanel = () => {
  const { user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminOverview();
      setOverview(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to load admin overview");
      setOverview(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userType === "admin") {
      loadOverview();
    }
  }, [user]);

  const summaryCards = useMemo(
    () => [
      {
        label: "Contact Submissions",
        value: overview?.contacts?.total ?? 0,
        hint: `${overview?.contacts?.unread ?? 0} new, ${overview?.contacts?.read ?? 0} read`,
        icon: FiMessageSquare,
        tone: "amber",
      },
      {
        label: "All Products",
        value: overview?.totals?.products ?? 0,
        hint: `${overview?.totals?.activeProducts ?? 0} active across the catalog`,
        icon: FiFolder,
        tone: "slate",
      },
      {
        label: "Active Records",
        value: overview?.totals?.activeProducts ?? 0,
        hint: "Live items currently visible to shoppers",
        icon: FiCheckCircle,
        tone: "emerald",
      },
      {
        label: "Admin Panel",
        value: "Overview",
        hint: "Counts are refreshed from the live database",
        icon: FiShield,
        tone: "indigo",
      },
    ],
    [overview],
  );

  if (user?.userType !== "admin") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#334155_100%)] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Admin Overview
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Project counting dashboard</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/72">
              This panel now shows the live count of contact submissions and product records across
              every section of the project.
            </p>
          </div>
          <button
            type="button"
            onClick={loadOverview}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiRefreshCw className={`${loading ? "animate-spin" : ""} h-4 w-4`} />
            {loading ? "Refreshing..." : "Refresh counts"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Sustainable Leather"
          total={overview?.collections?.sustainableLeather?.total ?? 0}
          active={overview?.collections?.sustainableLeather?.active ?? 0}
          categories={overview?.categories?.sustainableLeather || []}
        />
        <SectionCard
          title="Men"
          total={overview?.collections?.men?.total ?? 0}
          active={overview?.collections?.men?.active ?? 0}
          categories={overview?.categories?.men || []}
        />
        <SectionCard
          title="Women"
          total={overview?.collections?.women?.total ?? 0}
          active={overview?.collections?.women?.active ?? 0}
          categories={overview?.categories?.women || []}
        />
        <SectionCard
          title="Kids"
          total={overview?.collections?.kids?.total ?? 0}
          active={overview?.collections?.kids?.active ?? 0}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <FiActivity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Live Snapshot
            </p>
            <h3 className="text-lg font-bold text-slate-900">Contacts and products at a glance</h3>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
              New contacts
            </p>
            <p className="mt-2 text-2xl font-bold text-amber-700">{overview?.contacts?.unread ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
              Read contacts
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-700">{overview?.contacts?.read ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Collections tracked
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
