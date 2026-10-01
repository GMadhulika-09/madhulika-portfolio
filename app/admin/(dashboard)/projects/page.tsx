import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <main className="px-6 py-20">
        <p className="text-red-600">Error loading projects: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition"
        >
          + Add Project
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {projects.length === 0 && (
          <p className="text-gray-500">No projects yet.</p>
        )}

        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">
                {project.status} · order {project.sort_order}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="text-sm font-medium underline underline-offset-4"
              >
                Edit
              </Link>
              <Link
                href={`/admin/projects/${project.id}/delete`}
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