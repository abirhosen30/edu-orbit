'use client';

import { useCallback, useMemo, useSyncExternalStore } from "react";

interface StorageSnapshot<T> {
  value: T;
  error: string;
  raw: string | null | undefined;
}

const snapshotCache = new Map<string, StorageSnapshot<unknown>>();
const listeners = new Map<string, Set<() => void>>();
const changeEvent = "eduorbit:browser-storage-change";

function getSnapshot<T>(key: string, initialValue: T): StorageSnapshot<T> {
  if (typeof window === "undefined") {
    return { value: initialValue, error: "", raw: null };
  }

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    const cached = snapshotCache.get(key);
    if (cached && cached.raw === undefined) return cached as StorageSnapshot<T>;
    const snapshot = {
      value: initialValue,
      error: "Browser storage is unavailable.",
      raw: undefined,
    };
    snapshotCache.set(key, snapshot);
    return snapshot;
  }

  const cached = snapshotCache.get(key);
  if (cached?.raw === raw) return cached as StorageSnapshot<T>;
  if (raw === null) {
    const snapshot = { value: initialValue, error: "", raw };
    snapshotCache.set(key, snapshot);
    return snapshot;
  }

  try {
    const snapshot = { value: JSON.parse(raw) as T, error: "", raw };
    snapshotCache.set(key, snapshot);
    return snapshot;
  } catch {
    const snapshot = {
      value: initialValue,
      error: "Saved browser data is invalid. Clear this saved item and try again.",
      raw,
    };
    snapshotCache.set(key, snapshot);
    return snapshot;
  }
}

export function useBrowserStorage<T>(
  key: string,
  initialValue: T
): [T, (next: T | ((current: T) => T)) => void, string] {
  const subscribe = useCallback(
    (listener: () => void) => {
      const keyListeners = listeners.get(key) ?? new Set<() => void>();
      keyListeners.add(listener);
      listeners.set(key, keyListeners);

      const onStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) {
          snapshotCache.delete(key);
          listener();
        }
      };
      const onLocalChange = (event: Event) => {
        if ((event as CustomEvent<string>).detail === key) listener();
      };

      window.addEventListener("storage", onStorage);
      window.addEventListener(changeEvent, onLocalChange);
      return () => {
        keyListeners.delete(listener);
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(changeEvent, onLocalChange);
        if (keyListeners.size === 0) listeners.delete(key);
      };
    },
    [key]
  );

  const read = useCallback(
    () => getSnapshot(key, initialValue),
    [initialValue, key]
  );
  const serverValue = useMemo(
    () => ({ value: initialValue, error: "", raw: null }),
    [initialValue]
  );
  const serverSnapshot = useCallback(() => serverValue, [serverValue]);
  const snapshot = useSyncExternalStore(subscribe, read, serverSnapshot);

  const setValue = useCallback(
    (next: T | ((current: T) => T)) => {
      const current = getSnapshot(key, initialValue).value;
      const value = typeof next === "function"
        ? (next as (current: T) => T)(current)
        : next;

      window.localStorage.setItem(key, JSON.stringify(value));
      snapshotCache.delete(key);
      window.dispatchEvent(new CustomEvent(changeEvent, { detail: key }));
    },
    [initialValue, key]
  );

  return [snapshot.value, setValue, snapshot.error];
}
