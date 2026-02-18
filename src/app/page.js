"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  // Loading screen during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-[#111827] rounded-2xl shadow-2xl p-10 border border-gray-800 text-center">

        <h1 className="text-4xl font-bold text-white mb-2">
          Smart Bookmark
        </h1>

        <p className="text-gray-400 mb-8">
          Save, organize and access your important links anywhere.
        </p>

        <div className="text-gray-300 text-sm mb-10 space-y-2">
          <p>🔖 Store useful websites</p>
          <p>☁️ Access from any device</p>
          <p>🔐 Secure Google authentication</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-indigo-500 to-purple-600
          hover:from-indigo-600 hover:to-purple-700
          transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
        >
          Continue with Google
        </button>

        <p className="text-gray-500 text-xs mt-8">
          Powered by Supabase Authentication
        </p>

      </div>
    </div>
  );
}
