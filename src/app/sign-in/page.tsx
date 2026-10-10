'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  EduOrbitAccount,
  readEduOrbitAccounts,
  readStudentProfile,
  SESSION_STORAGE_KEY,
} from "@/lib/eduOrbitAccount";
import { useBrowserStorage } from "@/lib/useBrowserStorage";

export default function SignInPage() {
  const router = useRouter();
  const [, setSession] = useBrowserStorage<unknown>(SESSION_STORAGE_KEY, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    let matchedUser: EduOrbitAccount | undefined;
    try {
      const users = readEduOrbitAccounts();
      matchedUser = users.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );
    } catch (storageFailure) {
      setError(
        storageFailure instanceof Error
          ? storageFailure.message
          : "Could not read saved accounts from this browser."
      );
      return;
    }

    if (!matchedUser) {
      setError("Invalid email or password. Please check your details or create an account.");
      return;
    }

    try {
      const savedProfile = readStudentProfile(matchedUser.email);
      setSession({
        email: matchedUser.email,
        name: savedProfile?.name || matchedUser.name,
      });
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
          : "Could not sign in. Please try again."
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
              Your next step starts here
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight xl:text-5xl">
              Find the right scholarship for your future.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-blue-100/85">
              Sign in to continue exploring universities, scholarship details,
              and application opportunities in one place.
            </p>
          </div>

          <p className="text-xs text-blue-100/70">
            Discover opportunities. Plan your next move.
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
              <p className="text-sm font-semibold text-blue-600">Welcome back</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Sign in to EduOrbit
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Enter your account details to continue.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
                Sign in
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              New to EduOrbit?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
