"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function DeleteSkillPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadSkill() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("skills")
        .select("name")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Could not load skill.");
        setFetching(false);
        return;
      }

      setName(data.name);
      setFetching(false);
    }

    loadSkill();
  }, [id]);

  async function handleDelete() {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/skills");
    router.refresh();
  }

  if (fetching) {
    return (
      <main className="px-6 py-20">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-20 max-w-xl">
      <h1 className="text-3xl font-bold mb-4">Delete Skill</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {!error && (
        <>
          <p className="text-gray-700 mb-8">
            Are you sure you want to delete <strong>{name}</strong>? This
            cannot be undone.
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={() => router.push("/admin/skills")}
              className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </main>
  );
}