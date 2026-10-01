import { supabase } from "@/lib/supabase";

export async function getAbout(): Promise<string> {
  const { data, error } = await supabase
    .from("about")
    .select("content")
    .single();

  if (error || !data) {
    console.error("Error fetching about:", error);
    return "";
  }

  return data.content;
}