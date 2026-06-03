import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/auth/admin/all-users`);
      setUsers(Array.isArray(response.data) ? response.data : response.data?.users || []);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userType === "admin") {
      fetchUsers();
    }
  }, [user]);

  const toggleStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === "inactive" ? "active" : "inactive";
    try {
      const response = await axios.patch(`${baseUrl}/auth/admin/users/${userId}/status`, {
        status: nextStatus,
      });
      if (response.data?.success === false) {
        throw new Error(response.data?.error || "Failed to update status");
      }
      toast.success(`User marked ${nextStatus}`);
      setUsers((previous) =>
        previous.map((entry) =>
          entry._id === userId ? { ...entry, status: nextStatus } : entry,
        ),
      );
    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Failed to update status");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${baseUrl}/auth/admin/users/${userId}`);
      toast.success("User deleted");
      setUsers((previous) => previous.filter((entry) => entry._id !== userId));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete user");
    }
  };

  if (user?.userType !== "admin") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Admin
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">User Ledger</h2>
            <p className="mt-1 text-sm text-slate-600">
              Review, disable, or remove registered users.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-slate-600">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-slate-600">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((entry) => (
                  <tr key={entry._id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-medium text-slate-900">{entry.name}</td>
                    <td className="px-4 py-3 text-slate-700">{entry.email}</td>
                    <td className="px-4 py-3 text-slate-700">{entry.userType || "user"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          entry.status === "inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {entry.status || "active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleStatus(entry._id, entry.status)}
                          className="rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                        >
                          {entry.status === "inactive" ? "Activate" : "Deactivate"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteUser(entry._id)}
                          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
