import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Check if we're in signup mode - don't redirect during signup flow
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const isSignupMode = mode === "signup";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // If user is logged in and NOT in signup mode, redirect to dashboard
  if (user && !isSignupMode) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
