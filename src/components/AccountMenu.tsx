'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isEduOrbitSession, SESSION_STORAGE_KEY } from "@/lib/eduOrbitAccount";
import { useBrowserStorage } from "@/lib/useBrowserStorage";

export default function AccountMenu() {
  const router = useRouter();
  const [session, setSession, storageError] = useBrowserStorage<unknown>(
    SESSION_STORAGE_KEY,
    null
  );
  const [open, setOpen] = useState(false);
  const [actionError, setActionError] = useState("");
  const signedIn = isEduOrbitSession(session) ? session : null;
  const initials = signedIn?.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

  const signOut = () => {
    try {
      setSession(null);
      setActionError("");
      setOpen(false);
      router.push("/");
    } catch {
      setActionError("Could not sign out. Check browser storage settings and try again.");
      setOpen(true);
    }
  };

  if (!signedIn) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Sign Up
        </Link>
        {storageError ? <span className="sr-only" role="status">{storageError}</span> : null}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setActionError("");
          setOpen((current) => !current);
        }}
        aria-label={`Account menu for ${signedIn.name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white ring-2 ring-blue-100"
      >
        {initials}
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-[60] mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
        >
          <div className="border-b border-gray-100 px-3 py-2">
            <p className="truncate text-sm font-bold text-gray-900">{signedIn.name}</p>
            <p className="truncate text-xs text-gray-500">{signedIn.email}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
          >
            My profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={signOut}
            className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Sign out
          </button>
          {storageError || actionError ? (
            <p role="alert" className="px-3 py-2 text-xs text-red-700">
              {actionError || storageError}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
