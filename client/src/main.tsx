import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router } from "wouter";
import { AuthProvider } from "./lib/auth";
import { queryClient, trpc, getTrpcClient } from "./lib/trpc-client";
import App from "./App";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./index.css";

function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(() => {
    const savedToken = localStorage.getItem("auth_token");
    return getTrpcClient(savedToken);
  });

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TRPCProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </TRPCProvider>
  </React.StrictMode>
);