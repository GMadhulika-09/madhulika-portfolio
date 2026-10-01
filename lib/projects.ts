import { supabase } from "@/lib/supabase";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_link: string | null;
  demo_link: string | null;
  image_url: string | null;
  status: string;
  sort_order: number;
};

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data ?? [];
}