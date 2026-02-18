


"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/");
      } else {
        setEmail(user.email);
      }

      setLoading(false);
    };

    getUser();
  }, [router]);

  // 🚨 IMPORTANT: Prevent SSR/CSR mismatch
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-gray-400 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">

      <div className="w-full max-w-xl bg-[#111827] rounded-2xl shadow-2xl p-10 border border-gray-800">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Smart Bookmark
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Your personal link manager
        </p>

        <div className="bg-[#1f2937] rounded-xl px-5 py-4 mb-8 text-center border border-gray-700">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="font-semibold text-white break-all">{email}</p>
        </div>

        <div className="flex flex-col gap-4">

          <button
            onClick={() => router.push("/add")}
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700
            transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
          >
            ➕ Add Bookmark
          </button>

          <button
            onClick={() => router.push("/bookmarks")}
            className="w-full py-3 rounded-xl font-semibold
            border border-gray-600 text-gray-300
            hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            📚 View Bookmarks
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl font-semibold
            border border-red-500 text-red-400
            hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
