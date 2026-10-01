import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="relative w-full min-h-screen px-6 py-24 md:py-32 bg-transparent">
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-[#F8FAFC] mb-16">
        Projects
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}