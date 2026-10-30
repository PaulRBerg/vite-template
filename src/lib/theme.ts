import { Result, Schema } from "effect";

const STORAGE_KEY = "vite-template.theme";
const ThemePreferenceSchema = Schema.Literals(["system", "light", "dark"]);
const decodeThemePreference = Schema.decodeUnknownResult(ThemePreferenceSchema);

export type ThemePreference = typeof ThemePreferenceSchema.Type;

let preference: ThemePreference = "system";
const listeners = new Set<() => void>();

function readStoredPreference(): ThemePreference {
  try {
    const result = decodeThemePreference(window.localStorage.getItem(STORAGE_KEY));
    return Result.isSuccess(result) ? result.success : "system";
  } catch {
    return "system";
  }
}

function applyPreference(next: ThemePreference): void {
  document.documentElement.dataset.theme = next;
  if (preference === next) {
    return;
  }

  preference = next;
  for (const listener of listeners) {
    listener();
  }
}

export function initializeTheme(): () => void {
  applyPreference(readStoredPreference());

  function onStorage(event: StorageEvent): void {
    if (event.key === STORAGE_KEY || event.key === null) {
      applyPreference(readStoredPreference());
    }
  }

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

export function getThemePreference(): ThemePreference {
  return preference;
}

export function subscribeToTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setThemePreference(next: ThemePreference): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The current session still works when browser storage is unavailable.
  }
  applyPreference(next);
}
