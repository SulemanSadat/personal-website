"use client";

import { useId } from "react";
import Link from "../../components/SectionLink";
import {
  IconArrowUpRight, IconCheck, IconClock, IconCode,
  IconMessage, IconTrendingUp, IconShieldCheck, IconBolt,
} from "@tabler/icons-react";
import { createPricingInquiry } from "../../utils/pricingInquiry";


const solutions = [
  { name: "Customer Growth Systems", price: "$299", serviceId: "web-apps", icon: IconTrendingUp, outcome: "Turn more visitors into paying customers.", features: ["High-converting business websites", "Automated lead generation", "Online ordering and booking systems", "Customer acquisition and follow-up", "Sales and conversion optimization"], cta: "Grow My Business", prompt: "My business, target customers, and customer growth goals:" },
  { name: "Business Automation", price: "$499", serviceId: "automation", icon: IconBolt, outcome: "Save time, reduce operational costs, and eliminate repetitive manual work.", features: ["Workflow automation", "Business process optimization", "Third-party integrations", "Automated reporting and notifications", "Customer and data management"], cta: "Automate My Business", prompt: "My current tools, repetitive tasks, and time-saving goals:" },
  { name: "AI Assistants & Chatbots", price: "$399", serviceId: "chatbots", icon: IconMessage, outcome: "Serve customers around the clock without increasing your workload.", features: ["Intelligent customer support", "AI-powered sales assistants", "WhatsApp, Telegram, and website integrations", "Business knowledge integration", "Automated customer interactions"], cta: "Build My AI Assistant", prompt: "My customer questions, preferred channels, and available business knowledge:" },
  { name: "Custom Software & SaaS", price: "$1,499", serviceId: "web-apps", icon: IconCode, outcome: "Transform your business idea into a powerful, scalable digital product.", features: ["Custom web applications", "iOS and Android applications", "SaaS platforms", "Business management systems", "Custom backend and integrations"], cta: "Build My Product", prompt: "My product idea, intended users, and essential first-version requirements:" },
];
const consultations = [
  { name: "AI & Business Automation Consulting", price: "$80", features: ["Business process assessment", "AI and automation opportunities", "Actionable implementation roadmap"] },
  { name: "Software & Startup Consulting", price: "$80", features: ["Product strategy and validation", "Technical architecture", "MVP planning", "Development roadmap"] },
  { name: "Software Engineering Career Mentorship", price: "$30", features: ["Personalized learning roadmap", "Technical career guidance", "Skill development strategy", "Portfolio recommendations"] },
];
const support = [
  ["Free 15-minute discovery call", "Discuss your goals and explore whether a development project is the right fit."],
  ["Personalized solution planning", "Prioritize the capabilities that address your business needs within the agreed scope."],
  ["Guided implementation", "Get clear requests for the access, content, and feedback needed at each step."],
  ["Knowledge transfer and handover", "Agree on documentation and walkthroughs so you can use and manage your solution."],
  ["Transparent project milestones", "Review progress at agreed checkpoints, from scope approval to delivery."],
];
const faqs = [
  ["Are the displayed prices final?", "Solution prices are starting points in USD. The final price depends on the agreed scope and business requirements. Consultations are fixed at the displayed price for one 60-minute session."],
  ["What is included in the starting price?", "A focused solution with deliverables agreed before work begins. The listed capabilities are possibilities, not a bundle included at every starting price. Hosting, third-party subscriptions, and usage fees are discussed separately where needed."],
  ["How long does a project take?", "Timing depends on complexity, integrations, and the availability of content and feedback. We agree on a realistic timeline and review milestones before development begins."],
  ["Can I request a custom solution?", "Yes. Share your goals, current challenges, and budget. We can define a tailored scope or start with a focused first version."],
  ["How do consultations work?", "Choose a topic and send a booking request with your goals and availability. Each session lasts 60 minutes. We confirm the agenda, time, and payment arrangements before the session; clicking Book a Session does not charge you."],
  ["Is ongoing maintenance available?", "Ongoing maintenance can be discussed and quoted separately based on your support needs. Coverage, response expectations, and fees are agreed in advance."],
];

// Keep the existing subject/message query contract on the dedicated Contact route.
// Price is carried in both fields because Contact has no separate price input.
function inquiryHref(plan: { name: string; price: string }, serviceId: string, prompt: string) {
  const inquiry = createPricingInquiry({ plan, serviceId, serviceLabel: plan.name });
  const consultation = serviceId === "consultation";
  const subject = consultation
    ? inquiry.subject.replace("/hour", "/session")
    : `Inquiry: ${plan.name} (from ${plan.price})`;
  const message = consultation
    ? `Hello Suleman,\n\nI’d like to book ${plan.name} at ${plan.price} for one 60-minute session.\n\n${prompt}\n\nPlease confirm availability and the next steps.\n\nBest,`
    : `Hello Suleman,\n\nI’m interested in ${plan.name}, starting from ${plan.price}. I understand that capabilities depend on the agreed scope and business requirements.\n\n${prompt}\n\nPreferred timeline and budget:\n\nI’d like to discuss the scope, deliverables, timeline, and final price before development begins.\n\nBest,`;
  return `/contact/?${new URLSearchParams({ subject, message }).toString()}#contact-form`;
}
const discoveryHref = `/contact/?${new URLSearchParams({ subject: "Free 15-minute discovery call", message: "Hello Suleman,\n\nI’d like to arrange a free 15-minute discovery call to discuss a potential development project.\n\nMy business goals and requirements:\n\nMy availability and time zone:\n\nBest," }).toString()}#contact-form`;

function OfferCard({ offer, consultation = false }: { offer: typeof solutions[number] | typeof consultations[number]; consultation?: boolean }) {
  const headingId = useId();
  const solution = "serviceId" in offer ? offer : null;
  const Icon = solution?.icon ?? IconClock;
  return (
    <article className="pv__card" aria-labelledby={headingId}>
      <span className="pv__cardIcon"><Icon aria-hidden="true" /></span>
      <h3 id={headingId}>{offer.name}</h3>
      {solution && <p className="pv__outcome">{solution.outcome}</p>}
      <div className="pv__pricing">
        {!consultation && <span className="pv__priceLabel">Starting at</span>}
        <div><strong className="pv__price">{offer.price}</strong>{consultation && <span className="pv__unit">/session</span>}</div>
        <span className="pv__priceNote">{consultation ? "USD · 60 minutes · One-to-one" : "USD · Final price agreed before development"}</span>
      </div>
      <p className="pv__listLabel">{consultation ? "Session focus" : "Potential capabilities"}</p>
      <ul className="pv__features">{offer.features.map(feature => <li key={feature}><IconCheck aria-hidden="true" /><span>{feature}</span></li>)}</ul>
      {!consultation && <p className="pv__scope">Selected to fit your scope; not all included at the starting price.</p>}
      <Link className="pv__button" href={inquiryHref(offer, solution?.serviceId ?? "consultation", solution?.prompt ?? "My goals and questions:\n\nPreferred times and time zone:")} scroll={false} aria-label={`${solution?.cta ?? "Book a Session"} — ${offer.name}`}>
        {solution?.cta ?? "Book a Session"}<IconArrowUpRight aria-hidden="true" />
      </Link>
    </article>
  );
}

export default function Pricing({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? "h2" : "h1";
  return (
    <section className="pv__page" id="pricing" aria-labelledby="pricing-title">
      <div className="pv__container">
        <header className="pv__hero">
          <span className="section-eyebrow">INVEST IN YOUR BUSINESS</span>
          <Heading id="pricing-title">Invest in Results,<br /><span>Not Just Technology.</span></Heading>
          <p>Get tailored digital solutions designed to grow your business, automate operations, and turn your ideas into scalable products.</p>
          <div className="pv__outcomes"><span><IconTrendingUp aria-hidden="true" />Grow revenue</span><span><IconBolt aria-hidden="true" />Reduce operational costs</span><span><IconClock aria-hidden="true" />Save time</span></div>
        </header>

        <section className="pv__section" aria-labelledby="solutions-title">
          <div className="pv__sectionHeader"><div><span className="pv__eyebrow">01 / BUSINESS SOLUTIONS</span><h2 id="solutions-title">What would move your business forward?</h2></div><p>Start with your goals. Build the solution around them.</p></div>
          <div className="pv__solutions">{solutions.map(offer => <OfferCard key={offer.name} offer={offer} />)}</div>
          <p className="pv__terms">Every project is scoped individually. Final pricing depends on the agreed deliverables and business requirements.</p>
          <div className="pv__evidence"><p><strong>Experience you can explore.</strong> See existing work across business platforms, CRM automation, and customer integrations in my portfolio.</p><Link href="/portfolio" className="pv__textLink">Explore my work <IconArrowUpRight aria-hidden="true" /></Link></div>
        </section>

        <section className="pv__section" aria-labelledby="consulting-title">
          <div className="pv__sectionHeader"><div><span className="pv__eyebrow">02 / FOCUSED CONSULTATIONS</span><h2 id="consulting-title">Expert Guidance. Clear Direction.</h2></div><p>A focused, 60-minute session to work through your next step.</p></div>
          <div className="pv__consultations">{consultations.map(offer => <OfferCard key={offer.name} offer={offer} consultation />)}</div>
        </section>

        <section className="pv__section" aria-labelledby="value-title">
          <div className="pv__sectionHeader"><div><span className="pv__eyebrow">03 / A PARTNER IN THE PROCESS</span><h2 id="value-title">More Than Just Development</h2></div><p>Clear decisions. Less guesswork. Support from the first conversation to handover.</p></div>
          <div className="pv__support">{support.map(([title, description], index) => <div key={title}><span className="pv__step">0{index + 1}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
          <p className="pv__terms">Planning, implementation support, and handover are tailored to the development project and included where agreed in the scope.</p>
        </section>

        <section className="pv__confidence" aria-labelledby="confidence-title">
          <div><IconShieldCheck className="pv__shield" aria-hidden="true" /><h2 id="confidence-title">Start With Confidence</h2><p>Discuss your requirements before committing to a paid development project. We agree on the scope, deliverables, timeline, and final price before development begins.</p></div>
          <div className="pv__discovery"><Link className="pv__button" href={discoveryHref} scroll={false}>Book a Free Discovery Call <IconArrowUpRight aria-hidden="true" /></Link><span>15 minutes · Explore your project before committing</span></div>
        </section>

        <section className="pv__section pv__faq" aria-labelledby="faq-title">
          <div><span className="pv__eyebrow">THE DETAILS, UP FRONT</span><h2 id="faq-title">Frequently Asked Questions</h2></div>
          <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>
      </div>
    </section>
  );
}
