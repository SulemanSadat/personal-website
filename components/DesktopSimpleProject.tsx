import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { Project } from "../types/project";

interface DesktopSimpleProjectProps {
  project: Project;
}

export default function DesktopSimpleProject({ project }: DesktopSimpleProjectProps) {
  const titleId = `desktop-project-${project.id}-title`;
  const descriptionId = `desktop-project-${project.id}-description`;

  return (
    <article className="desktop-project-tile" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <Image
        className="desktop-project-thumbnail"
        src={project.image}
        alt=""
        width={800}
        height={500}
        sizes="(min-width: 1600px) 18vw, (min-width: 1100px) 22vw, 1px"
        loading="lazy"
      />
      <div className="desktop-project-overlay">
        <span className="desktop-project-category">{project.category}</span>
        <h3 id={titleId}>{project.title}</h3>
        <p id={descriptionId}>{project.description}</p>
        <div className="desktop-project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              View project <IconArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              GitHub <IconArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
