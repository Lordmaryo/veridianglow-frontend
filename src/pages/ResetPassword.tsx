import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import Input from "../components/Input";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const { resetPassword, loading } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword(token ?? "", password, confirmPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 rounded-md shadow-md overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            className="w-full py-3 px-4 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-opacity-85 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
