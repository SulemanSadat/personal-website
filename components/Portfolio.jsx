import React, { useState } from 'react';
import Image from "next/image";
import { IconBrandGithub as FaGithub, IconArrowUpRight as FaExternalLinkAlt, IconCode as FaCode, IconDeviceMobile as FaMobile, IconRobot as FaRobot, IconAutomation as FaCogs } from "@tabler/icons-react";
import { projects } from '../data/projects';
// import game from '../assets/game.jpg';

function Portfolio({ embedded = false }) {
  const Heading = embedded ? 'h2' : 'h1';
  const [activeFilter, setActiveFilter] = useState('web');


const filters = [
  { key: 'web', label: 'Web Apps', icon: FaCode },
  { key: 'automation', label: 'Automation', icon: FaCogs },
  { key: 'chatbot', label: 'Chatbots', icon: FaRobot },
  { key: 'mobile', label: 'Mobile Apps', icon: FaMobile }
];


  const filteredProjects = projects.filter(project => project.category === activeFilter);


  return (
    <section className="portfolio-container" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-content">
        <div className="portfolio-header">
          <span className="section-eyebrow">Selected work / Real-world solutions</span>
          <Heading className="portfolio-title section-heading" id="portfolio-title">Software Engineering Portfolio</Heading>
          <p className="portfolio-subtitle">
            Explore full-stack web applications, AI automation workflows, chatbots and mobile products built to solve practical business problems.
          </p>
        </div>

        <div className="all-projects-section">
          {/* <h2 className="section-title">All Projects</h2> */}

          <div className="filter-tabs" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                aria-pressed={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
              >
                <filter.icon aria-hidden="true" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          <p className="sr-only" role="status">{filteredProjects.length} projects shown</p>
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <article key={project.id} className="project-card">
                <div className="project-image">
                  <Image src={project.image} alt={`${project.title} software project built with ${project.technologies.slice(0, 3).join(', ')}`} loading={!embedded && index === 0 ? "eager" : "lazy"} fetchPriority={!embedded && index === 0 ? "high" : "auto"} decoding="async" width={600} height={360} />
                  {project.featured && <span className="project-featured">Featured project</span>}
                  <div className="project-overlay">
                    <div className="project-links">
                     {project.github && <a
                        href={project.github}

                        rel="noopener noreferrer"
                        className="project-link"
                        data-cursor="View"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <FaGithub />
                      </a>}
                    {project.live && <a
                      href={project.live}

                      rel="noopener noreferrer"
                      className="project-link project-link--visit"
                      data-cursor="View"
                      aria-label={`View ${project.title} live`}
                    >
                      <span>VISIT</span><FaExternalLinkAlt aria-hidden="true" />
                    </a>}
                                        </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  {project.location && <p className="project-location">{project.location}</p>}
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* <div className="portfolio-cta">
          <h3 className="cta-title">Interested in working together?</h3>
          <p className="cta-description">
            Let's discuss your project and create something amazing together.
          </p>
          <a href="#contact" className="cta-button">
            Get In Touch
          </a>
        </div> */}
      </div>
    </section>
  );
}

export default Portfolio;

