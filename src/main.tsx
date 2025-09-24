import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import "./index.css";

import { Toaster } from "sonner";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { store } from "./redux/store.ts";
import router from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
