import { createElement, useEffect, useRef, useState, type ComponentType, type SVGProps, type CSSProperties } from "react";

import { FiPause, FiCode, FiMessageSquare } from "react-icons/fi";
import { FaJava, FaDatabase } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { SiJavascript, SiTypescript, SiPhp, SiPython, SiCplusplus, SiReact, SiNextdotjs, SiFlutter, SiTailwindcss, SiHtml5, SiFigma, SiLaravel, SiNodedotjs, SiMysql, SiTelegram, SiClaude, SiN8N, SiDocker, SiGit, SiGithubactions, SiWordpress, SiShopify } from "react-icons/si";

// Cursor brand glyph from Simple Icons (CC0), not a generic mouse-pointer icon.
type SkillIcon = ComponentType<SVGProps<SVGSVGElement>>;
type CSSPropertiesWithVars = CSSProperties & Record<`--${string}`, string | number>;
function getLaneStyle(index: number): CSSPropertiesWithVars {
  return { "--lane-duration": `${38 + index * 7}s`, "--lane-delay": `-${index * 6}s` };
}
function CursorIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" /></svg>;
}
const skillLanes: { label: string; skills: [string, SkillIcon][] }[] = [
  { label: "Core development skills", skills: [["TypeScript", SiTypescript], ["Python", SiPython], ["JavaScript (ES6+)", SiJavascript], ["C++", SiCplusplus], ["PHP", SiPhp], ["SQL", FaDatabase], ["Java", FaJava], ["C#", TbBrandCSharp], ["React.js", SiReact], ["Next.js", SiNextdotjs]] },
  { label: "Product and application skills", skills: [["Figma", SiFigma], ["Flutter", SiFlutter], ["HTML5/CSS3", SiHtml5], ["Tailwind CSS", SiTailwindcss], ["React Native", SiReact], ["Laravel", SiLaravel], ["Telegram API", SiTelegram], ["Node.js", SiNodedotjs], ["MySQL", SiMysql], ["RESTful APIs", FiCode]] },
  { label: "AI, automation and delivery skills", skills: [["Claude Code", SiClaude], ["n8n", SiN8N], ["OpenAI API", FiCode], ["Cursor AI", CursorIcon], ["Prompt Engineering", FiMessageSquare], ["Codex", FiCode], ["Docker", SiDocker], ["Shopify", SiShopify], ["Git/GitHub", SiGit], ["CI/CD", SiGithubactions], ["WordPress", SiWordpress]] },
];

export default function SkillsShowcase() {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    if (!sectionRef.current) return;
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} className="skills-section" aria-labelledby="skills-title">
      <div className="skills-heading">
        <div><span className="section-eyebrow">The toolkit / Always evolving</span><h2 id="skills-title">Expertise & Skills</h2><p>A comprehensive toolkit built through years of hands-on experience and continuous learning.</p></div>
        <button type="button" className="skills-pause" onClick={() => setPaused(!paused)} aria-pressed={paused}><FiPause aria-hidden="true" />{paused ? "Play motion" : "Pause motion"}</button>
      </div>
      <div className={`skills-lanes ${paused ? "is-paused" : ""} ${inView ? "" : "is-offscreen"}`}>
        {skillLanes.map((lane, index) => <div className="skills-row" key={lane.label} style={getLaneStyle(index)}>
          <div className="skills-window">
            <div className={`skills-track ${index % 2 ? "skills-track--reverse" : ""}`}>
              {[0, 1].map(copy => <ul className="skills-group" key={copy} aria-label={copy === 0 ? lane.label : undefined} aria-hidden={copy === 1 ? true : undefined}>
                {lane.skills.map(([label, icon], skillIndex) => <li className={`skill-chip skill-chip--${skillIndex % 3}`} key={label}>{createElement(icon, { "aria-hidden": true })}<span>{label}</span></li>)}
              </ul>)}
            </div>
          </div>
        </div>)}
      </div>
    </section>
  );
}


