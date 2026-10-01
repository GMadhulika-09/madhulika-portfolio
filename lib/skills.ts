import { supabase } from "@/lib/supabase";

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: string | null;
  icon: string | null;
  sort_order: number;
};

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error);
    return [];
  }

  return data ?? [];
}