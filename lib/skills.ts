import { supabase } from "@/lib/supabase";

export type Skill = {
  id: string;
  name: string;
  category: string;
  level: string | null;
  icon: string | null;
  sort_order: number;
};

const fallbackSkills: Skill[] = [
  { id: "html", name: "HTML", category: "Web Development", level: null, icon: null, sort_order: 1 },
  { id: "css", name: "CSS", category: "Web Development", level: null, icon: null, sort_order: 2 },
  { id: "javascript", name: "JavaScript", category: "Programming", level: null, icon: null, sort_order: 3 },
  { id: "java", name: "Java", category: "Programming", level: null, icon: null, sort_order: 4 },
  { id: "c", name: "C", category: "Programming", level: null, icon: null, sort_order: 5 },
  { id: "mongodb", name: "MongoDB", category: "Database", level: null, icon: null, sort_order: 6 },
];

export async function getSkills(): Promise<Skill[]> {
  if (!supabase) return fallbackSkills;

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching skills:", error);
    return fallbackSkills;
  }

  return data?.length ? data : fallbackSkills;
}
