"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [email, setEmail] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ================= GET USER + BOOKMARKS =================
  useEffect(() => {
    const loadDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      // If not logged in
      if (!user) {
        router.push("/");
        return;
      }

      setEmail(user.email);

      // Fetch bookmarks
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .order("id", { ascending: false });

      if (!error && data) {
        setBookmarks(data);
      }

      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // ================= DELETE BOOKMARK =================
  const deleteBookmark = async (id) => {
    const confirmDelete = confirm("Delete this bookmark?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete bookmark");
      console.log(error);
    } else {
      // instant UI update
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  // ================= LOADING SCREEN =================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="text-gray-400 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">

      {/* ===== TOP BAR ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

        <div>
          <h1 className="text-4xl font-bold text-white">Smart Bookmark</h1>
          <p className="text-gray-400 text-sm mt-1">
            Your personal link manager
          </p>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          <span className="text-gray-300 text-sm break-all">{email}</span>

          <button
            onClick={() => router.push("/add")}
            className="px-5 py-2 rounded-lg text-white font-semibold
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700 transition"
          >
            + Add
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== NO BOOKMARKS ===== */}
      {bookmarks.length === 0 ? (
        <div className="flex items-center justify-center mt-32">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">
              No bookmarks saved yet
            </p>

            <button
              onClick={() => router.push("/add")}
              className="px-6 py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700"
            >
              Add Your First Bookmark 🚀
            </button>
          </div>
        </div>
      ) : (

        /* ===== BOOKMARK GRID ===== */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="relative bg-[#111827] border border-gray-800 rounded-2xl p-5
              hover:border-indigo-500 hover:scale-105 transition duration-300"
            >

              {/* DELETE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBookmark(bookmark.id);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg"
                title="Delete"
              >
                🗑️
              </button>

              {/* CLICKABLE BOOKMARK */}
              <div
                className="cursor-pointer"
                onClick={() => window.open(bookmark.url, "_blank")}
              >

                {/* TITLE + FAVICON */}
                <div className="flex items-center gap-3 mb-2">

                  <img
                    src={
                      bookmark.favicon ||
                      "https://www.google.com/s2/favicons?sz=64&domain=google.com"
                    }
                    alt="favicon"
                    className="w-6 h-6 rounded"
                  />

                  <h2 className="text-xl font-semibold text-white break-words">
                    {bookmark.title}
                  </h2>

                </div>

                {/* URL */}
                <p className="text-gray-400 text-sm break-all">
                  {bookmark.url}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
