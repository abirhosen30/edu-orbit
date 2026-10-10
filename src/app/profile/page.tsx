'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState, useSyncExternalStore } from "react";
import AccountMenu from "@/components/AccountMenu";
import {
  emptyStudentProfile,
  getProfileStorageKey,
  isEduOrbitSession,
  isStudentProfile,
  SESSION_STORAGE_KEY,
  StudentProfile,
} from "@/lib/eduOrbitAccount";
import { useBrowserStorage } from "@/lib/useBrowserStorage";

const guestProfileKey = "eduorbit_profile_guest";
const subscribeToNothing = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export default function ProfilePage() {
  const router = useRouter();
  const isHydrated = useSyncExternalStore(
    subscribeToNothing,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const [session, setSession] = useBrowserStorage<unknown>(SESSION_STORAGE_KEY, null);
  const account = isEduOrbitSession(session) ? session : null;
  const profileKey = account ? getProfileStorageKey(account.email) : guestProfileKey;
  const [storedProfile, setStoredProfile, storageError] = useBrowserStorage<unknown>(
    profileKey,
    emptyStudentProfile
  );
  const [draftProfile, setDraftProfile] = useState<StudentProfile | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const profile =
    draftProfile ??
    (isStudentProfile(storedProfile)
      ? { ...storedProfile, name: storedProfile.name || account?.name || "" }
      : { ...emptyStudentProfile, name: account?.name ?? "" });
  const invalidProfile =
    storedProfile !== emptyStudentProfile && !isStudentProfile(storedProfile);

  useEffect(() => {
    if (isHydrated && !account) {
      router.replace("/");
    }
  }, [account, isHydrated, router]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDraftProfile((current) => ({
      ...profile,
      ...current,
      [name]: value,
    }));
    setSaved(false);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaved(false);

    if (!isHydrated || !account) {
      router.replace("/sign-in?next=%2Fprofile");
      return;
    }
    if (!profile.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (profile.cgpa) {
      const cgpa = Number(profile.cgpa);
      if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > Number(profile.cgpaScale)) {
        setError(`CGPA must be between 0 and ${profile.cgpaScale}.`);
        return;
      }
    }
    if (profile.ieltsOverall) {
      const score = Number(profile.ieltsOverall);
      if (!Number.isFinite(score) || score < 0 || score > 9) {
        setError("IELTS overall score must be between 0 and 9.");
        return;
      }
    }
    if (profile.toeflScore) {
      const score = Number(profile.toeflScore);
      if (!Number.isInteger(score) || score < 0 || score > 120) {
        setError("TOEFL score must be a whole number between 0 and 120.");
        return;
      }
    }
    if (profile.greScore) {
      const score = Number(profile.greScore);
      if (!Number.isInteger(score) || score < 260 || score > 340) {
        setError("GRE score must be a whole number between 260 and 340.");
        return;
      }
    }

    const updatedProfile = {
      ...profile,
      name: profile.name.trim(),
      phone: profile.phone.trim(),
      country: profile.country.trim(),
      city: profile.city.trim(),
      university: profile.university.trim(),
      degree: profile.degree.trim(),
      fieldOfStudy: profile.fieldOfStudy.trim(),
      bio: profile.bio.trim(),
    };

    try {
      setStoredProfile(updatedProfile);
      setDraftProfile(updatedProfile);
      setSession({ ...account, name: updatedProfile.name });
      setSaved(true);
    } catch {
      setError("Could not save your profile. Check browser storage settings and try again.");
    }
  };

  const updateProfile = (field: keyof StudentProfile) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      handleChange(event);
      if (field === "cgpaScale" && profile.cgpa) {
        const newScale = event.target.value;
        if (Number(profile.cgpa) > Number(newScale)) {
          setError(`Your CGPA is higher than the selected ${newScale}-point scale.`);
        }
      }
    };

  if (!account) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-sm font-medium text-slate-600">Opening your profile…</p>
      </main>
    );
  }

  const inputClass =
    "mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
  const labelClass = "text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-black tracking-tight text-blue-700">
            EduOrbit
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/eligibility" className="hidden text-sm font-semibold text-slate-600 hover:text-blue-700 sm:block">
              Dashboard
            </Link>
            <AccountMenu />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <nav aria-label="Breadcrumbs" className="mb-5 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          <span aria-hidden="true">›</span>
          <span className="font-semibold text-blue-700">My profile</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-sm font-bold text-white">
                {account.name.trim().slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-900">{account.name}</p>
                <p className="truncate text-xs text-slate-500">{account.email}</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-blue-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Profile checklist</p>
              <p className="mt-1 text-sm leading-relaxed text-blue-950">
                Add your academic background and test scores to get more relevant opportunities.
              </p>
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Student account</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950">My profile</h1>
                <p className="mt-1 text-sm text-slate-500">Add or edit your personal and academic information.</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {profile.university ? "Academic profile started" : "Academic profile not completed"}
              </span>
            </div>

            {storageError || error || invalidProfile ? (
              <p role="alert" className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {error || storageError || "Your saved profile data is invalid. Update the fields and save to replace it."}
              </p>
            ) : null}
            {saved ? (
              <p role="status" className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                Your profile has been saved.
              </p>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6 space-y-8">
              <section aria-labelledby="personal-info-heading">
                <h2 id="personal-info-heading" className="text-base font-bold text-slate-900">Personal information</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                    Full name *
                    <input className={inputClass} name="name" value={profile.name} onChange={handleChange} autoComplete="name" required />
                  </label>
                  <label className={labelClass}>
                    Email address
                    <input className={`${inputClass} bg-slate-50 text-slate-500`} value={account.email} readOnly />
                  </label>
                  <label className={labelClass}>
                    Phone number
                    <input className={inputClass} name="phone" value={profile.phone} onChange={handleChange} type="tel" autoComplete="tel" placeholder="+880…" />
                  </label>
                  <label className={labelClass}>
                    Country
                    <input className={inputClass} name="country" value={profile.country} onChange={handleChange} autoComplete="country-name" placeholder="Bangladesh" />
                  </label>
                  <label className={labelClass}>
                    City
                    <input className={inputClass} name="city" value={profile.city} onChange={handleChange} autoComplete="address-level2" />
                  </label>
                </div>
              </section>

              <section aria-labelledby="academic-info-heading">
                <h2 id="academic-info-heading" className="text-base font-bold text-slate-900">Academic background</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className={labelClass}>
                    Current / last university
                    <input className={inputClass} name="university" value={profile.university} onChange={handleChange} autoComplete="organization" placeholder="University name" />
                  </label>
                  <label className={labelClass}>
                    Current / highest degree
                    <select className={inputClass} name="degree" value={profile.degree} onChange={handleChange}>
                      <option value="">Select degree</option>
                      <option value="High school">High school</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor's">Bachelor&apos;s</option>
                      <option value="Master's">Master&apos;s</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label className={labelClass}>
                    Field of study
                    <input className={inputClass} name="fieldOfStudy" value={profile.fieldOfStudy} onChange={handleChange} placeholder="Computer Science, Economics…" />
                  </label>
                  <label className={labelClass}>
                    Graduation year
                    <input className={inputClass} name="graduationYear" value={profile.graduationYear} onChange={handleChange} inputMode="numeric" placeholder="2026" />
                  </label>
                  <div className="sm:col-span-2">
                    <span className={labelClass}>CGPA / GPA</span>
                    <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_140px] gap-3">
                      <input className={inputClass.replace("mt-1.5 ", "")} name="cgpa" value={profile.cgpa} onChange={handleChange} type="number" min="0" max={profile.cgpaScale} step="0.01" placeholder={`Score out of ${profile.cgpaScale}`} />
                      <select className={inputClass.replace("mt-1.5 ", "")} name="cgpaScale" value={profile.cgpaScale} onChange={updateProfile("cgpaScale")} aria-label="CGPA scale">
                        <option value="4">Out of 4</option>
                        <option value="5">Out of 5</option>
                        <option value="10">Out of 10</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section aria-labelledby="test-scores-heading">
                <h2 id="test-scores-heading" className="text-base font-bold text-slate-900">English and admission test scores</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <label className={labelClass}>
                    IELTS overall
                    <input className={inputClass} name="ieltsOverall" value={profile.ieltsOverall} onChange={handleChange} type="number" min="0" max="9" step="0.5" placeholder="e.g. 7.5" />
                  </label>
                  <label className={labelClass}>
                    TOEFL iBT
                    <input className={inputClass} name="toeflScore" value={profile.toeflScore} onChange={handleChange} type="number" min="0" max="120" step="1" placeholder="e.g. 100" />
                  </label>
                  <label className={labelClass}>
                    GRE total
                    <input className={inputClass} name="greScore" value={profile.greScore} onChange={handleChange} type="number" min="260" max="340" step="1" placeholder="e.g. 324" />
                  </label>
                </div>
              </section>

              <section aria-labelledby="about-heading">
                <h2 id="about-heading" className="text-base font-bold text-slate-900">About you</h2>
                <label className={`${labelClass} mt-4 block`}>
                  Short introduction
                  <textarea className={inputClass} name="bio" value={profile.bio} onChange={handleChange} rows={4} maxLength={500} placeholder="Share your academic interests and study goals…" />
                  <span className="mt-1 block text-right text-xs font-normal text-slate-500">{profile.bio.length}/500</span>
                </label>
              </section>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
                <Link href="/eligibility" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Go to dashboard
                </Link>
                <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25">
                  Save profile
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
