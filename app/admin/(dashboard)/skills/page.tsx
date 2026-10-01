import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function AdminSkillsPage() {
  const supabase = await createClient();

  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <main className="px-6 py-20">
        <p className="text-red-600">Error loading skills: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition"
        >
          + Add Skill
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {skills.length === 0 && (
          <p className="text-gray-500">No skills yet.</p>
        )}

        {skills.map((skill) => (
          <div
            key={skill.id}
            className="border rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm text-gray-500">
                {skill.category}
                {skill.level ? ` · ${skill.level}` : ""} · order {skill.sort_order}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/skills/${skill.id}/edit`}
                className="text-sm font-medium underline underline-offset-4"
              >
                Edit
              </Link>
              <Link
                href={`/admin/skills/${skill.id}/delete`}
                className="text-sm font-medium text-red-600 underline underline-offset-4"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}