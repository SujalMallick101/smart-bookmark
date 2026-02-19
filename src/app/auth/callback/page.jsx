"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // This reads the #access_token from URL
      await supabase.auth.exchangeCodeForSession(window.location.href);

      // After saving session -> go dashboard
      router.replace("/dashboard");
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <p className="text-gray-300 text-lg animate-pulse">
        Signing you in...
      </p>
    </div>
  );
}
