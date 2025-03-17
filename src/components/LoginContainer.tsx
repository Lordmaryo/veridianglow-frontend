import React, { useState } from "react";
import { Loader, Lock, Mail } from "lucide-react";
import { ToggleEventProps } from "./SignUpContainer";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const LoginContainer = ({ setToggleEvent }: ToggleEventProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="max-w-[800px] mx-auto mt-5 px-4">
      <div>
        <h1 className="md:text-3xl text-2xl font-semibold text-center ">
          Log in to your account
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-[500px] bg-zinc-100 px-4 py-2 mt-10 mx-auto space-y-4"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
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
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <Lock size={20} className="absolute left-1 top-2" />
              <input
                id="password"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="bg-zinc-200 w-full outline-none py-2 pl-8 rounded-md"
              />
            </div>
          </div>
          <button
            disabled={loading}
            className="disabled:opacity-75 cursor-pointer bg-accent text-white w-full py-2 rounded-md hover:opacity-85 transition-opacity"
          >
            {loading ? (
              <div className="flex flex-row justify-center items-center gap-2">
                <Loader size={20} className="animate-spin" aria-hidden={true} />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center gap-2">
                <span>Login</span>
              </div>
            )}
          </button>
        </form>
        <div
          className="max-w-[500px] mx-auto flex sm:flex-row flex-col justify-between
        items-center gap-4 mt-3"
        >
          <div>
            <span>Don't have an account? </span>
            <button
              onClick={() => setToggleEvent(true)}
              className="text-black font-bold"
            >
              Sign up here{" "}
            </button>
          </div>
          <Link to={"/forgot-password"} className="font-bold hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
