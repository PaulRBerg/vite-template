if (import.meta.env.DEV) {
  const { getGlobalApi } = await import("react-grab");
  getGlobalApi()?.setOptions({ activationKey: "Meta+G", keyHoldDuration: 0 });
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { AppErrorBoundary } from "@/app-error-boundary.js";
import { App } from "@/app.js";

import "@/styles.css";

const root = document.querySelector("#root");
if (!(root instanceof HTMLElement)) {
  throw new Error("The Vite template root element is missing.");
}

const router = createBrowserRouter([
  { Component: App, ErrorBoundary: AppErrorBoundary, path: "*" },
]);

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
