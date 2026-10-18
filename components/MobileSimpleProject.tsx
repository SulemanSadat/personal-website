import { useId } from 'react';
import Image from 'next/image';
import { IconChevronDown, IconArrowUpRight } from '@tabler/icons-react';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import type { Project } from '../types/project';
import type { Transition } from 'framer-motion';

interface MobileSimpleProjectProps { project: Project; expanded: boolean; onToggle: () => void }
export default function MobileSimpleProject({ project, expanded, onToggle }: MobileSimpleProjectProps) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const layoutTransition: Transition = reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38, mass: .8 };
  const revealTransition: Transition = reduceMotion ? { duration: 0 } : { duration: .28, ease: [.22, 1, .36, 1] as const };
  return <Motion.article layout={!reduceMotion} transition={{ layout: layoutTransition }} className="simple-project" data-expanded={expanded}>
    <Motion.button layout="position" transition={{ layout: layoutTransition }} type="button" className="simple-project-toggle" aria-expanded={expanded} aria-controls={id} aria-label={`${expanded ? 'Collapse' : 'Expand'} ${project.title}`} onClick={onToggle}>
      <Motion.span layout transition={{ layout: layoutTransition }} className="simple-project-image"><Image src={project.image} alt="" loading="lazy" width={800} height={500} sizes="(max-width: 999px) 90vw, 800px" /></Motion.span>
      <Motion.span layout="position" transition={{ layout: layoutTransition }} className="simple-project-summary">
        <span className="cinema-kicker">{project.category}</span>
        <strong>{project.title}</strong>
        <Motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={revealTransition} className="simple-project-chevron"><IconChevronDown size={19} aria-hidden="true" /></Motion.span>
      </Motion.span>
    </Motion.button>
    <Motion.div id={id} className="simple-project-details" initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} transition={revealTransition} inert={!expanded} aria-hidden={!expanded}>
      <Motion.div className="simple-project-details-inner" animate={{ y: expanded || reduceMotion ? 0 : -8 }} transition={revealTransition}>
        <p>{project.description}</p>
        <div className="tunnel-tech" aria-label="Technologies">{project.technologies.map((tech, i) => <span key={i}>{tech}</span>)}</div>
        <div className="tunnel-links">
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">View project <IconArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <IconArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}
        </div>
      </Motion.div>
    </Motion.div>
  </Motion.article>;
}
