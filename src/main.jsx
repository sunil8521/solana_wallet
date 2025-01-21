import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { ContextProvider } from "./context/Context";
import {ThemeProvider} from "./components/Shared/theme-provider"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>

    <ContextProvider>
      <Toaster richColors />
      <App />
    </ContextProvider>
    </ThemeProvider>
  </StrictMode>
);
