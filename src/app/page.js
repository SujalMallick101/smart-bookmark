"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Home() {

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard"
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Smart Bookmark App</h1>

      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
