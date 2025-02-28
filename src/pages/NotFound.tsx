import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import LoadingSpinner from "../components/LoadingSpinner";

const NotFound = () => {
  const { checkingAuth } = useAuthStore();

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <div className="px-4 flex flex-col items-center justify-center h-screen text-accent">
      {/* Ghost Animation */}
      <div className="ghost w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-lg animate-float">
        👻
      </div>

      {/* Error Message */}
      <h1 className="text-6xl font-bold mt-6">404</h1>
      <p className="text-black mt-2 sm:text-base text-sm">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-accent text-white font-bold rounded-md shadow-md hover:opacity-85 transition duration-300"
      >
        Go Home
      </Link>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
