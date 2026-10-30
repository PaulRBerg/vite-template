import { Monitor, Moon, Sun } from "lucide-react";

import { setThemePreference } from "@/lib/theme.js";
import { useTheme } from "@/lib/use-theme.js";
import { Button } from "@/ui/button.js";

const THEME_OPTIONS = [
  { icon: Monitor, label: "System", preference: "system" },
  { icon: Sun, label: "Light", preference: "light" },
  { icon: Moon, label: "Dark", preference: "dark" },
] as const;

export function ThemeControl() {
  const preference = useTheme();

  return (
    <div aria-label="Appearance" className="flex shrink-0 gap-1" role="group">
      {THEME_OPTIONS.map(({ icon: Icon, label, preference: option }) => (
        <Button
          aria-label={label}
          aria-pressed={preference === option}
          className="aria-pressed:bg-accent-soft aria-pressed:text-accent-ink"
          key={option}
          onClick={() => setThemePreference(option)}
          size="icon"
          title={label}
          variant="ghost"
        >
          <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </Button>
      ))}
    </div>
  );
}
