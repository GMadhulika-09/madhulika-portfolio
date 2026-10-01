"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="bg-[#111827]/40 backdrop-blur-md border border-[#1E293B] rounded-2xl overflow-hidden hover:border-[#10B981]/40 transition flex flex-col"
    >
      {project.image_url && (
        <div className="relative w-full h-48">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">{project.title}</h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-4">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#F8FAFC] underline underline-offset-4 hover:text-[#10B981] transition-colors">
              GitHub
            </a>
          )}
          {project.demo_link && (
            <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#F8FAFC] underline underline-offset-4 hover:text-[#10B981] transition-colors">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}