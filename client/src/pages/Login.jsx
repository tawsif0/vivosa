import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";
import usePublicSettings from "../hooks/usePublicSettings";
import BackToHomeButton from "../components/Auth/BackToHomeButton";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { canRegister, loaded } = usePublicSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const loadingToast = toast.loading("Signing you in...");

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, data);
      login(response.data.user, response.data.token);
      toast.dismiss(loadingToast);
      toast.success("Successfully logged in");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,252,246,0.98),_rgba(246,241,232,0.97)_42%,_rgba(224,214,191,0.92)_100%)] px-4 py-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-deep-forest/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-gold-accent/12 blur-3xl" />
        <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-mint/24 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-deep-forest/6 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col justify-center">
        <div className="mx-auto mb-5 pt-2">
          <BackToHomeButton className="mx-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-[2rem] border border-secondary-fixed/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,247,241,0.98))] shadow-[0_20px_80px_rgba(0,50,34,0.12)] backdrop-blur-xl"
        >
          <div className="h-2 w-full bg-gradient-to-r from-deep-forest via-gold-accent to-secondary-fixed" />
          <div className="p-7 md:p-8">
            <div className="text-center">
              <p className="mx-auto inline-flex rounded-full border border-deep-forest/10 bg-emerald-mint px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-deep-forest">
                Admin Portal
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-pure-black">
                Welcome Back
              </h2>
              <p className="mt-3 text-sm text-on-surface-variant">
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                  Email
                </label>
                <div className="relative">
                  <EnvelopeIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant/50" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full rounded-2xl border bg-surface-bright px-12 py-3.5 text-on-surface outline-none transition focus:border-deep-forest focus:ring-4 focus:ring-deep-forest/10 ${
                      errors.email ? "border-red-400" : "border-outline-variant"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email ? (
                  <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                  Password
                </label>
                <div className="relative">
                  <KeyIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`w-full rounded-2xl border bg-surface-bright px-12 py-3.5 pr-14 text-on-surface outline-none transition focus:border-deep-forest focus:ring-4 focus:ring-deep-forest/10 ${
                      errors.password ? "border-red-400" : "border-outline-variant"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-gold-accent/20 bg-secondary-fixed px-3 py-2 text-deep-forest shadow-sm transition hover:border-gold-accent/40 hover:bg-secondary-container"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-red-500">{errors.password.message}</p>
                ) : null}
                <div className="mt-3 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-deep-forest transition hover:text-gold-accent"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-deep-forest px-5 py-3.5 text-sm font-semibold text-on-primary shadow-lg shadow-[0_14px_30px_rgba(0,50,34,0.22)] transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>

            {loaded && canRegister ? (
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,247,241,0.98))] px-4 text-xs font-medium uppercase tracking-[0.2em] text-on-surface-variant">
                      New here?
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={goToRegister}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-gold-accent/40 bg-secondary-fixed px-5 py-3 text-sm font-semibold text-on-tertiary-container transition hover:border-gold-accent/70 hover:bg-secondary-container"
                >
                  Create New Account
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
