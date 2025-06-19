import { Toaster as ShadcnToaster } from "@/components/ui/toaster"; // Renamed to avoid conflict
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound"; // Always Must Include
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import AccountLockedPage from "./pages/AccountLockedPage";
import PostLoginRedirectPage from "./pages/PostLoginRedirectPage";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendered, setting up routes.');
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ShadcnToaster /> {/* For shadcn/ui useToast */}
        <SonnerToaster richColors closeButton /> {/* For sonner library */}
        <BrowserRouter>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route path="/account-locked" element={<AccountLockedPage />} />

            {/* Application Routes */}
            <Route path="/dashboard" element={<PostLoginRedirectPage />} />
            
            {/* Default route: redirect to login or dashboard based on auth status (not implemented here, so default to login) */}
            {/* For simplicity, redirecting to /login. In a real app, check auth status. */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;