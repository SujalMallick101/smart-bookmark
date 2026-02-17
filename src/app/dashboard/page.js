"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        // if not logged in → send back to home
        router.push("/");
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking login...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="text-lg">
        Logged in as: <span className="font-semibold">{user.email}</span>
      </p>
    </div>
  );
}
