'use client';

import Link from "next/link";
import { ReactNode, useSyncExternalStore } from "react";
import { isEduOrbitSession, SESSION_STORAGE_KEY } from "@/lib/eduOrbitAccount";
import { useBrowserStorage } from "@/lib/useBrowserStorage";

interface UniversityAccessGateProps {
  children: ReactNode;
  returnTo: string;
  title?: string;
  description?: string;
}

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export default function UniversityAccessGate({
  children,
  returnTo,
  title = "Sign in to view university details",
  description = "Create an account or sign in to see the full university profile, scholarship information, and admissions details.",
}: UniversityAccessGateProps) {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const [session] = useBrowserStorage<unknown>(SESSION_STORAGE_KEY, null);

  if (!isHydrated) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm font-medium text-slate-600">Checking account access…</p>
      </main>
    );
  }

  if (isEduOrbitSession(session)) return children;

  const encodedReturnTo = encodeURIComponent(returnTo);
  return (
    <main className="flex min-h-[55vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10">
        <div aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-700">
          🔒
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
          Student account required
        </p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {description}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
          <Link
            href={`/sign-in?next=${encodedReturnTo}`}
            className="inline-flex items-center justify-center rounded-xl border border-blue-600 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Sign in
          </Link>
          <Link
            href={`/sign-up?next=${encodedReturnTo}`}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
