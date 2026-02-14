import { useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, ArrowRight, Sparkles, ArrowLeft,Lock } from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
   
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent!");
      setIsSubmitted(true);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-8 text-foreground">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">SkillBridge</span>
          </Link>

          <h1 className="text-3xl font-display font-bold mb-2">Reset Password</h1>
          <p className="text-muted-foreground mb-8">
            {isSubmitted 
              ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>

          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors h-10" 
                disabled={isLoading}
              >
                {isLoading ? "Sending link..." : (
                  <>
                    Send Reset Link
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 items-center justify-center p-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 text-center max-w-lg"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Lock className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4 text-foreground">
            Secure Your Account
          </h2>
          <p className="text-lg text-muted-foreground">
            Get back on track quickly and safely. We'll help you recover your access in just a few steps.
          </p>
          
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl" />
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-accent/20 blur-xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;