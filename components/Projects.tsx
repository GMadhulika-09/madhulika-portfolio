import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="content-section projects-section">
      <div className="section-heading projects-heading">
        <div>
          <p className="eyebrow">A FEW THINGS I HAVE BUILT</p>
          <h2>Selected <span>work</span></h2>
        </div>
        <p className="section-side-note">Ideas turned into<br />working projects</p>
      </div>
      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="empty-projects">Projects will appear here soon.</p>
      )}
    </section>
  );
}
