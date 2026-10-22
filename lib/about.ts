import { supabase } from "@/lib/supabase";

const fallbackAbout =
  "I’m a Computer Science & Engineering student interested in building useful web experiences, learning new technologies, and turning ideas into projects. I’m currently strengthening my development skills one step at a time.";

export async function getAbout(): Promise<string> {
  if (!supabase) return fallbackAbout;

  const { data, error } = await supabase
    .from("about")
    .select("content")
    .single();

  if (error || !data) {
    console.error("Error fetching about:", error);
    return fallbackAbout;
  }

  return data.content || fallbackAbout;
}
