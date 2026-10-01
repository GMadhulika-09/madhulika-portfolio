import { supabase } from "@/lib/supabase";

export type ContactLinks = {
  id: string;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  phone: string | null;
  resume_url: string | null;
};

export async function getContactLinks(): Promise<ContactLinks | null> {
  const { data, error } = await supabase
    .from("contact_links")
    .select("*")
    .single();

  if (error || !data) {
    console.error("Error fetching contact links:", error);
    return null;
  }

  return data;
}