import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      "useTheme precisa ser usado dentro de <ThemeProvider>."
    );
  }

  return ctx;
}
