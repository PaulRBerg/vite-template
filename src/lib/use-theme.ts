import { useSyncExternalStore } from "react";

import { getThemePreference, subscribeToTheme } from "@/lib/theme.js";

export function useTheme() {
  return useSyncExternalStore(subscribeToTheme, getThemePreference);
}
