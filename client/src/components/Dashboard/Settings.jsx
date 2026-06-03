import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Settings = ({ user }) => {
  const { updateUser } = useAuth();
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const profileForm = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    profileForm.reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [profileForm, user]);

  const onSaveProfile = async (values) => {
    setSavingProfile(true);
    try {
      const response = await axios.put(`${baseUrl}/auth/profile`, values);
      const updatedUser = response.data?.user || response.data || user;
      updateUser(updatedUser);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const onSavePassword = async (values) => {
    setSavingPassword(true);
    try {
      await axios.put(`${baseUrl}/auth/change-password`, values);
      toast.success("Password changed successfully. Please log in again.");
      passwordForm.reset();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Account
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Settings</h2>
        <p className="mt-1 text-sm text-slate-600">
          Update your profile details and password.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={profileForm.handleSubmit(onSaveProfile)}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">Profile</h3>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                type="text"
                {...profileForm.register("name", { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                {...profileForm.register("email", { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingProfile ? "Saving..." : "Save Profile"}
          </button>
        </form>

        <form
          onSubmit={passwordForm.handleSubmit(onSavePassword)}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-900">Password</h3>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Current password
              </label>
              <input
                type="password"
                {...passwordForm.register("currentPassword", { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                New password
              </label>
              <input
                type="password"
                {...passwordForm.register("newPassword", { required: true, minLength: 8 })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingPassword ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
