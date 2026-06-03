import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import BackToHomeButton from "../components/Auth/BackToHomeButton";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/auth/forgot-password`, values);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
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
                Account Recovery
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-pure-black">
                Forgot Password
              </h2>
              <p className="mt-3 text-sm text-on-surface-variant">
                Enter your email and we’ll send a reset link.
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
                    placeholder="you@example.com"
                    className={`w-full rounded-2xl border bg-surface-bright px-12 py-3.5 text-on-surface outline-none transition focus:border-deep-forest focus:ring-4 focus:ring-deep-forest/10 ${
                      errors.email ? "border-red-400" : "border-outline-variant"
                    }`}
                  />
                </div>
                {errors.email ? (
                  <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-deep-forest px-5 py-3.5 text-sm font-semibold text-on-primary shadow-lg shadow-[0_14px_30px_rgba(0,50,34,0.22)] transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
                <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Remembered it?{" "}
                <Link
                  className="font-semibold text-deep-forest transition hover:text-gold-accent"
                  to="/login"
                >
                  Back to login
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
