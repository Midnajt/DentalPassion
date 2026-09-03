import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HashViewProvider } from "./lib/hash-view";
import "./i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashViewProvider>
      <App />
    </HashViewProvider>
  </StrictMode>,
);
