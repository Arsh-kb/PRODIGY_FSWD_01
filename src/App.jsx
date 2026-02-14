import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { toast } from "sonner";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const isVerified = user?.email_confirmed_at !== null;

  return (
    <Routes>
      {/* Root Route logic fixed */}
      <Route
        path="/"
        element={
          !user ? (
            <Navigate to="/login" />
          ) : isVerified ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/verify-email" />
          )
        }
      />

      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          !user ? (
            <Navigate to="/login" />
          ) : isVerified ? (
            <Dashboard user={user} />
          ) : (
            <Navigate to="/verify-email" />
          )
        }
      />

      <Route
        path="/verify-email"
        element={user && !isVerified ? <VerifyEmail /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

function VerifyEmail() {
  const [isChecking, setIsChecking] = useState(false);

  const resendEmail = async () => {
    // We need to fetch the current user data safely
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      toast.error("Could not find user email.");
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification email resent! Check your inbox.");
    }
  };

  const checkVerification = async () => {
    setIsChecking(true);
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      toast.error("Could not verify session. Try logging in again.");
    } else if (data.session?.user?.email_confirmed_at) {
      toast.success("Email verified successfully! Redirecting...");
    } else {
      toast.error(
        "Email is still not verified. Please check your inbox or spam folder.",
      );
    }
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-lg border border-border">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-foreground">
          Check your email
        </h2>
        <p className="text-muted-foreground mb-8">
          We need to verify your email address before you can access the
          dashboard.
        </p>

        <div className="space-y-3">
          <button
            onClick={checkVerification}
            disabled={isChecking}
            className="w-full py-2 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isChecking ? "Checking..." : "I've verified my email"}
          </button>

          <button
            onClick={resendEmail}
            className="w-full py-2 px-4 bg-white text-foreground border border-border rounded-md font-medium hover:bg-muted transition-colors"
          >
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
}
