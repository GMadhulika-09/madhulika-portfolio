import { getAbout } from "@/lib/about";

export default async function About() {
  const content = await getAbout();
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0);

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32 bg-transparent">
      <div className="max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-8">
          About Me
        </h2>
        {paragraphs.map((para, i) => (
          <p key={i} className="text-[#94A3B8] leading-relaxed mb-4 last:mb-0">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}