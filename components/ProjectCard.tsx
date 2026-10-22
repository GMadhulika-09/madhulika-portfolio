"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -7 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="project-card"
    >
      <div className="project-visual">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            unoptimized
            className="project-image"
          />
        ) : (
          <div className="project-image-placeholder">
            <span>PROJECT / {project.sort_order.toString().padStart(2, "0")}</span>
            <strong>{project.title}</strong>
            <span className="visual-arrow">↗</span>
          </div>
        )}
      </div>
      <div className="project-info">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span className="project-arrow" aria-hidden="true">↗</span>
        </div>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-links">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          )}
          {project.demo_link && (
            <a href={project.demo_link} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
