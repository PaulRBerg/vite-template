import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getThemePreference,
  initializeTheme,
  setThemePreference,
  subscribeToTheme,
} from "@/lib/theme.js";

const STORAGE_KEY = "vite-template.theme";
const dataset: { theme?: string } = {};
let stored = new Map<string, string>();
let events = new EventTarget();
const cleanups: (() => void)[] = [];

function startTheme(): void {
  cleanups.push(initializeTheme());
}

function emitStorage(key: string | null): void {
  events.dispatchEvent(Object.assign(new Event("storage"), { key }));
}

beforeEach(() => {
  stored = new Map();
  events = new EventTarget();
  delete dataset.theme;
  vi.stubGlobal("document", { documentElement: { dataset } });
  vi.stubGlobal("window", {
    addEventListener: events.addEventListener.bind(events),
    localStorage: {
      getItem: (key: string) => stored.get(key) ?? null,
      setItem: (key: string, value: string) => stored.set(key, value),
    },
    removeEventListener: events.removeEventListener.bind(events),
  });
});

afterEach(() => {
  for (const cleanup of cleanups.splice(0)) {
    cleanup();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("theme preference", () => {
  it.each(["system", "light", "dark"] as const)("restores stored %s", (preference) => {
    stored.set(STORAGE_KEY, preference);
    startTheme();

    expect(getThemePreference()).toBe(preference);
    expect(dataset.theme).toBe(preference);
  });

  it.each([null, "", "sepia", '"dark"', "DARK"])("defaults %j to system", (value) => {
    if (value !== null) {
      stored.set(STORAGE_KEY, value);
    }
    startTheme();

    expect(getThemePreference()).toBe("system");
    expect(dataset.theme).toBe("system");
  });

  it("defaults to system when accessing localStorage throws", () => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
    startTheme();

    expect(getThemePreference()).toBe("system");
    expect(dataset.theme).toBe("system");
  });

  it("applies and persists each explicit override and the return to system", () => {
    startTheme();

    for (const preference of ["dark", "light", "system"] as const) {
      setThemePreference(preference);
      expect(getThemePreference()).toBe(preference);
      expect(dataset.theme).toBe(preference);
      expect(stored.get(STORAGE_KEY)).toBe(preference);
    }
  });

  it("applies a preference in the current session when writing storage fails", () => {
    startTheme();
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("Storage full");
    });

    setThemePreference("dark");

    expect(getThemePreference()).toBe("dark");
    expect(dataset.theme).toBe("dark");
    expect(stored.has(STORAGE_KEY)).toBe(false);
  });

  it("notifies subscribers only on changes and removes subscriptions", () => {
    startTheme();
    const listener = vi.fn();
    const unsubscribe = subscribeToTheme(listener);
    cleanups.push(unsubscribe);

    setThemePreference("light");
    setThemePreference("light");
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    setThemePreference("dark");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("synchronizes external storage updates and clearing storage", () => {
    startTheme();
    stored.set(STORAGE_KEY, "dark");
    emitStorage("unrelated");
    expect(getThemePreference()).toBe("system");

    emitStorage(STORAGE_KEY);
    expect(getThemePreference()).toBe("dark");
    expect(dataset.theme).toBe("dark");

    stored.clear();
    emitStorage(null);
    expect(getThemePreference()).toBe("system");
    expect(dataset.theme).toBe("system");
  });

  it("removes its browser listener when disposed", () => {
    const cleanup = initializeTheme();
    cleanups.push(cleanup);
    setThemePreference("light");
    cleanup();

    stored.set(STORAGE_KEY, "dark");
    emitStorage(STORAGE_KEY);
    expect(getThemePreference()).toBe("light");
    expect(dataset.theme).toBe("light");
  });
});
