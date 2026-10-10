export interface EduOrbitSession {
  email: string;
  name: string;
}

export interface EduOrbitAccount extends EduOrbitSession {
  password: string;
}

export interface StudentProfile {
  name: string;
  phone: string;
  country: string;
  city: string;
  university: string;
  degree: string;
  fieldOfStudy: string;
  graduationYear: string;
  cgpa: string;
  cgpaScale: "4" | "5" | "10";
  ieltsOverall: string;
  toeflScore: string;
  greScore: string;
  bio: string;
}

export const SESSION_STORAGE_KEY = "eduorbit_session";
export const USERS_STORAGE_KEY = "eduorbit_users";

export function getProfileStorageKey(email: string) {
  return `eduorbit_profile_${encodeURIComponent(email.trim().toLowerCase())}`;
}

export function readStudentProfile(email: string): StudentProfile | null {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(getProfileStorageKey(email));
  } catch {
    throw new Error("Browser storage is unavailable. Check your browser settings.");
  }
  if (raw === null) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isStudentProfile(parsed)) {
      throw new Error("Saved profile data is invalid. Update your profile and try again.");
    }
    return parsed;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Saved profile data")) {
      throw error;
    }
    throw new Error("Saved profile data could not be read. Update your profile and try again.");
  }
}

export function isEduOrbitAccount(value: unknown): value is EduOrbitAccount {
  if (!value || typeof value !== "object") return false;
  const account = value as Record<string, unknown>;
  return (
    typeof account.name === "string" &&
    typeof account.email === "string" &&
    typeof account.password === "string"
  );
}

export function isEduOrbitSession(value: unknown): value is EduOrbitSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Record<string, unknown>;
  return typeof session.name === "string" && typeof session.email === "string";
}

export function isStudentProfile(value: unknown): value is StudentProfile {
  if (!value || typeof value !== "object") return false;
  const profile = value as Record<string, unknown>;
  return (
    typeof profile.name === "string" &&
    typeof profile.phone === "string" &&
    typeof profile.country === "string" &&
    typeof profile.city === "string" &&
    typeof profile.university === "string" &&
    typeof profile.degree === "string" &&
    typeof profile.fieldOfStudy === "string" &&
    typeof profile.graduationYear === "string" &&
    typeof profile.cgpa === "string" &&
    (profile.cgpaScale === "4" ||
      profile.cgpaScale === "5" ||
      profile.cgpaScale === "10") &&
    typeof profile.ieltsOverall === "string" &&
    typeof profile.toeflScore === "string" &&
    typeof profile.greScore === "string" &&
    typeof profile.bio === "string"
  );
}

export function readEduOrbitAccounts(): EduOrbitAccount[] {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(USERS_STORAGE_KEY);
  } catch {
    throw new Error("Browser storage is unavailable. Check your browser settings.");
  }

  if (raw === null) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isEduOrbitAccount)) {
      throw new Error("Saved account data is invalid. Clear browser storage and try again.");
    }
    return parsed;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Saved account data")) {
      throw error;
    }
    throw new Error("Saved account data could not be read. Clear browser storage and try again.");
  }
}

export function writeEduOrbitAccounts(accounts: EduOrbitAccount[]) {
  try {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    throw new Error("Could not save your account. Check browser storage settings and try again.");
  }
}

export const emptyStudentProfile: StudentProfile = {
  name: "",
  phone: "",
  country: "",
  city: "",
  university: "",
  degree: "",
  fieldOfStudy: "",
  graduationYear: "",
  cgpa: "",
  cgpaScale: "4",
  ieltsOverall: "",
  toeflScore: "",
  greScore: "",
  bio: "",
};
