import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ShieldCheck } from "lucide-react";
import { supabase } from "../supabaseClient";
import { toast } from "sonner";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const provider =
    user?.app_metadata?.provider || "email";

  const avatar =
    user?.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa", padding: "40px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={avatar}
            alt="avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "20px"
            }}
          />

          <h2 style={{ marginBottom: "10px" }}>
            {user?.user_metadata?.full_name || user?.email}
          </h2>

          <p style={{ color: "#666", marginBottom: "15px" }}>
            {user?.email}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "#e0e7ff",
              color: "#4338ca",
              borderRadius: "20px",
              fontSize: "14px",
              marginBottom: "30px"
            }}
          >
            <ShieldCheck size={16} />
            Logged in via {provider}
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "10px" }}>Session Information</h3>
          <p style={{ fontSize: "14px", color: "#555" }}>
            User ID: {user?.id}
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Email Verified: {user?.email_confirmed_at ? "Yes" : "No"}
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
