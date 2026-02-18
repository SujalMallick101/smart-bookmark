"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddBookmark() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from("bookmarks")
            .insert([
                {
                    user_id: user.id,
                    title: title,
                    url: url,
                },
            ]);

        if (error) {
            console.log("SUPABASE ERROR:", error.message);
            alert(error.message);
        } else {
            alert("Bookmark saved!");
            setTitle("");
            setUrl("");

            // go back to dashboard after saving
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">

            {/* Card */}
            <div className="w-full max-w-xl bg-[#111827] rounded-2xl shadow-2xl p-10 border border-gray-800">

                {/* Title */}
                <h1 className="text-3xl font-bold text-white mb-2 text-center">
                    Add New Bookmark
                </h1>

                <p className="text-gray-400 text-center mb-8">
                    Save your important links securely
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Title Input */}
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

                    {/* URL Input */}
                    <div>
                        <label className="text-gray-300 text-sm mb-1 block">
                            Website URL
                        </label>
                        <input
                            className="w-full p-3 rounded-lg bg-[#1f2937] border border-gray-700
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700
            transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
                    >
                        Save Bookmark
                    </button>

                    {/* Back Button */}
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
