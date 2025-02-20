import { useEffect, useState } from "react";

const SomethingWentWrong = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="px-4 flex flex-col items-center justify-center h-screen bg-white">
      {/* Animated Warning Icon */}
      <div className="relative">
        <div className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
          ⚠️
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-6">Something Went Wrong</h1>
      <p className="text-gray-400 mt-2">
        {isOnline
          ? "An unexpected error occurred. Try refreshing the page."
          : "You're offline! Check your internet connection and try again."}
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-3 bg-accent text-white font-bold rounded-md shadow-md hover:opacity-85 transition duration-300"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default SomethingWentWrong;
