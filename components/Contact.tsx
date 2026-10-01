import { getContactLinks } from "@/lib/contact";

export default async function Contact() {
  const links = await getContactLinks();

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32 text-center bg-transparent">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC] mb-6">
        Get In Touch
      </h2>
      <p className="text-[#94A3B8] max-w-md mb-8">
        Feel free to reach out — I am always open to interesting collaborations, hackathons, and conversations about tech.
      </p>

      <div className="flex flex-col gap-3 items-center">
        {links?.email && (
          <a href={`mailto:${links.email}`} className="text-sm font-medium text-[#F8FAFC] underline underline-offset-4 hover:text-[#10B981] transition-colors">
            {links.email}
          </a>
        )}
        <div className="flex gap-6 mt-2">
          {links?.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#F8FAFC] underline underline-offset-4 hover:text-[#10B981] transition-colors">
              GitHub
            </a>
          )}
          {links?.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#F8FAFC] underline underline-offset-4 hover:text-[#10B981] transition-colors">
              LinkedIn
            </a>
          )}
          {links?.phone && (
            <a href={`tel:${links.phone}`} className="text-sm font-medium text-[#F8FAFC] underline underline-offset-4 hover:text-[#10B981] transition-colors">
              {links.phone}
            </a>
          )}
          {links?.resume_url && (
            <a href={links.resume_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#F8FAFC] underline underline-offset-4 hover:text-[#10B981] transition-colors">
              Resume
            </a>
          )}
        </div>
      </div>
    </section>
  );
}