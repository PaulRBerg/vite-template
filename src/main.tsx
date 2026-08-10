if (import.meta.env.DEV) {
  void import("react-grab");
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/App.js";

import "@/styles.css";

const root = document.querySelector<HTMLDivElement>("#root");
if (root === null) {
  throw new Error("The Vite template root element is missing.");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
