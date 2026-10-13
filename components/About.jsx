import { IconArrowUpRight as FiArrowUpRight, IconCode as FiCode, IconWorld as FiGlobe, IconLayersIntersect as FiLayers } from "@tabler/icons-react";
import Image from "next/image";
const suleman = "/assets/sulemansadat.jpg";
const CV = "/assets/Suleman_Sadat.pdf";
import SkillsShowcase from "./SkillsShowcase";

export default function About({ embedded = false }) {
  const Heading = embedded ? "h2" : "h1";
  return (
    <section className="about-container" id="about" aria-labelledby="about-title">
      <div className="about-main-section">
        <div className="about-heading-row">
          <div><span className="section-eyebrow">Behind the code / 01</span><Heading className="section-heading" id="about-title">About Suleman Sadat</Heading></div>
          <span className="about-coordinate">ENGINEERING × ENTREPRENEURSHIP</span>
        </div>
        <div className="about-editorial">
          <figure className="about-photo">
            <Image src={suleman} alt="Suleman Sadat, software engineer and product builder" loading="lazy" width={700} height={800} />
            <figcaption><span>Suleman Sadat</span><span>Engineer. Builder. Always learning.</span></figcaption>
          </figure>
          <div className="about-story">
            <span className="about-file"><FiCode aria-hidden="true" /> about / suleman.md</span>
            <h2>Thoughtful code.<br /><span>Useful products.</span></h2>
            <p>Hey! 👋 I’m Suleman Sadat, a software engineer and full-stack developer with 4+ years of experience building production-ready web applications for international clients.</p>
            <p>My work spans web platforms, API integrations, AI automation and product engineering. I collaborate remotely across time zones using tools like GitHub, Slack and Notion, and I’m working toward building useful SaaS products as a tech entrepreneur.</p>
            <div className="about-principles">
              <div><FiLayers aria-hidden="true" /><span><strong>From idea to implementation</strong>Full-stack systems, with a product mindset.</span></div>
              <div><FiGlobe aria-hidden="true" /><span><strong>Built for collaboration</strong>Remote experience. Shared ambition.</span></div>
            </div>
            <a href={CV} download className="button-secondary">Download Resume <FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <SkillsShowcase />
      </div>
    </section>
  );
}

