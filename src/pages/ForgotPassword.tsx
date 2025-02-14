import { ArrowLeft, Mail, MoveLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/useAuthStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailFormat = /^\S+@\S+\.\S+$/;

    if (email.match(emailFormat)) {
      forgotPassword(email);
      setIsSubmitted(true);
    } else {
      toast.error("Not a valid email", { id: "error" });
    }
  };

  return (
    <div className="max-w-[500px] mx-auto shadow-lg bg-zinc-100 mt-10 p-4 text-center relative">
      {isSubmitted && (
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-sm absolute top-7 left-4 font-bold hover:underline"
        >
          <MoveLeft size={20} />
        </button>
      )}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
        Forgot Password
      </h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <p className="my-2">
            Enter your email address and we'll send a link to reset your
            password
          </p>
          <div className="relative">
            <Mail size={20} className="absolute left-1 top-2" />
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="bg-zinc-200 w-full outline-none py-2 pl-8 rounded-md"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="py-2 w-full bg-accent text-white my-2 rounded-md
       hover:bg-opacity-85 transition font-semibold"
          >
            Send reset link
          </button>
        </form>
      ) : (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto my-4"
          >
            <Mail className="text-white" />
          </motion.div>
          <p className="mb-6">
            If an account exists for{" "}
            <span className="font-bold">{email || "null"}</span>, you will
            receive a password reset link shortly.
          </p>

          <Link
            to={"/signin"}
            className=" hover:underline flex items-center justify-center font-bold"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
