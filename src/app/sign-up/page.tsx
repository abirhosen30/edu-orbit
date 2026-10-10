'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  EduOrbitAccount,
  readEduOrbitAccounts,
  SESSION_STORAGE_KEY,
  writeEduOrbitAccounts,
} from "@/lib/eduOrbitAccount";
import { useBrowserStorage } from "@/lib/useBrowserStorage";

export default function SignUpPage() {
  const router = useRouter();
  const [, setSession] = useBrowserStorage<unknown>(SESSION_STORAGE_KEY, null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName || !trimmedEmail || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match. Please re-enter both fields.");
      return;
    }

    let users: EduOrbitAccount[];
    try {
      users = readEduOrbitAccounts();
    } catch (storageFailure) {
      setError(
        storageFailure instanceof Error
          ? storageFailure.message
          : "Could not read saved accounts from this browser."
      );
      return;
    }
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === trimmedEmail.toLowerCase()
    );

    if (alreadyExists) {
      setError("An account with this email already exists. Please sign in instead.");
      return;
    }

    try {
      writeEduOrbitAccounts([
        ...users,
        {
          name: trimmedName,
          email: trimmedEmail,
          password: form.password,
        },
      ]);
      setSession({ name: trimmedName, email: trimmedEmail });
      const requestedPath = new URLSearchParams(window.location.search).get("next");
      const returnTo =
        requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
          ? requestedPath
          : "/profile";
      router.push(returnTo);
    } catch (storageFailure) {
      setError(
        storageFailure instanceof Error
          ? storageFailure.message
          : "Could not create your account. Please try again."
      );
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-blue-100/80 to-transparent"
      />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-2">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-10 text-white lg:flex xl:p-14">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-xl font-extrabold tracking-tight"
            aria-label="EduOrbit home"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl"
              aria-hidden="true"
            >
              ◎
            </span>
            EduOrbit
          </Link>

          <div className="my-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Start your scholarship journey
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight xl:text-5xl">
              Build your profile and unlock better matches.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-blue-100/85">
              Create your free account to track scholarships, compare universities,
              and stay on top of deadlines.
            </p>
          </div>

          <p className="text-xs text-blue-100/70">
            Your future starts with the right opportunity.
          </p>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-blue-700 lg:hidden"
              aria-label="EduOrbit home"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-xl"
                aria-hidden="true"
              >
                ◎
              </span>
              EduOrbit
            </Link>

            <div className="mt-8 lg:mt-0">
              <p className="text-sm font-semibold text-blue-600">Create account</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Join EduOrbit
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Set up your profile to discover scholarships that fit you.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25"
              >
                Create account
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
