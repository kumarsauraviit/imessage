import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { BrowserRouter } from "react-router";
// This pattern is based on the React Context API.
// We wrap the application with provider components so that shared functionality (such as routing and authentication) is available to every component through React Context.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
