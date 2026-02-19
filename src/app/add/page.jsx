
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddBookmark() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // get favicon from domain
  const getFavicon = (link) => {
    try {
      if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = "https://" + link;
      }

      const domain = new URL(link).hostname;
      return "https://www.google.com/s2/favicons?sz=64&domain=" + domain;
    } catch (err) {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      router.push("/");
      return;
    }

    let formattedUrl = url.trim();

    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    const favicon = getFavicon(formattedUrl);

    const { error } = await supabase.from("bookmarks").insert([
      {
        user_id: user.id,
        title: title.trim(),
        url: formattedUrl,
        favicon: favicon,
      },
    ]);

    if (error) {
      alert("Failed to save bookmark");
      console.log(error);
      setLoading(false);
    } else {
      alert("Bookmark saved!");
      setTitle("");
      setUrl("");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#111827] rounded-2xl shadow-2xl p-10 border border-gray-800">

        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Add New Bookmark
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Save your important links securely
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div>
            <label className="text-gray-300 text-sm mb-1 block">
              Bookmark Title
            </label>
            <input
              className="w-full p-3 rounded-lg bg-[#1f2937] border border-gray-700
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ex: React Documentation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">
              Website URL
            </label>
            <input
              className="w-full p-3 rounded-lg bg-[#1f2937] border border-gray-700
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700
            transition-all duration-300 shadow-lg hover:shadow-indigo-500/30
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Bookmark"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full py-3 rounded-xl font-semibold
            border border-gray-600 text-gray-300
            hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            ← Back to Dashboard
          </button>

        </form>
      </div>
    </div>
  );
}

