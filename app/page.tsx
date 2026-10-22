
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { createClient } from "@/lib/supabase-server";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("contact_links")
    .select("profile_image_url")
    .limit(1)
    .maybeSingle();

  const profileImageUrl = data?.profile_image_url || "/images/madhulika-portrait.jpg";

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-background text-foreground selection:bg-[#282B4A] selection:text-[#EEEBDA]">
      <Navbar />
      <main className="w-full">
        <Hero profileImageUrl={profileImageUrl} />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
