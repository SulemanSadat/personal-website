"use client";
import { useState, useId } from "react";
import Link from "../../components/SectionLink";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import {
  IconArrowUpRight as FiArrowUpRight,
  IconCheck as FiCheck,
  IconClock as FiClock,
  IconCode as FiCode,
  IconMessage as FiMessageSquare,
  IconDeviceDesktop as FiMonitor,
  IconShieldCheck as FiShield,
  IconDeviceMobile as FiSmartphone,
  IconX as FiX,
  IconBolt as FiZap,
  IconVideo as FiVideo,
} from "@tabler/icons-react";
import { pricingServices, shopifyPlan, shopifyPromotion } from "../../data/pricing";
import ServiceOfferCard from "../../components/ServiceOfferCard";
import { pricingComparisons } from "../../data/pricingComparisons";
import { createPricingInquiry } from "../../utils/pricingInquiry";

const serviceIcons = {
  "web-apps": FiMonitor,
  automation: FiZap,
  "mobile-app": FiSmartphone,
  chatbots: FiMessageSquare,
  consultation: FiVideo,
};

function PricingCard({ plan, serviceLabel, serviceId, comparison }) {
  const headingId = useId();
  const delivery = plan.features.find((feature) => feature.startsWith("Delivery:"));
  const inquiry = createPricingInquiry({ serviceLabel, serviceId, plan });
  const href = `/?${new URLSearchParams(inquiry).toString()}#contact`;

  return (
    <article className={`p2__card ${plan.featured ? "p2__card--featured" : ""}`} aria-labelledby={headingId}>
      <div className="p2__cardTop">
        <span className="p2__tier">{plan.id === "essential" ? "The essentials" : plan.id === "recommended" ? "Room to grow" : "Built around you"}</span>
        {plan.badge && <span className="p2__badge">{plan.badge}</span>}
      </div>
      <header className="p2__cardHeader">
        <h3 className="p2__planName" id={headingId}>{plan.name}</h3>
        <p className="p2__planDesc">{plan.desc}</p>
      </header>
      <div className="p2__pricing">
        <span className="p2__priceLabel">{plan.unit} from</span>
        <div className="p2__priceRow">
          <span className="p2__price">{plan.price}</span>
          {plan.discount && <span className="p2__discount">{plan.discount}</span>}
        </div>
        <span className="p2__priceNote">USD · Scoped to your project</span>
      </div>
      <Link
        className={`p2__btn ${plan.featured ? "p2__btn--primary" : "p2__btn--secondary"}`}
        href={href}
        scroll={false}
        aria-label={`${plan.cta} — ${serviceLabel}, ${plan.name}`}
      >
        {plan.cta}<FiArrowUpRight aria-hidden="true" />
      </Link>
      <div className="p2__divider" />
      <h4 className="p2__included">Package comparison</h4>
      <ul className="p2__list" aria-label={`${plan.name} feature comparison`}>
        {comparison.map(({ id, label, values, upgrade }) => {
          const value = values[plan.id];
          const included = value !== false;
          const Icon = included ? FiCheck : FiX;
          return (
            <li key={id} data-feature={id} className={`p2__item ${included ? "p2__item--included" : "p2__item--excluded"} ${included && upgrade ? "p2__item--upgrade" : ""}`}>
              <Icon className="p2__featureIcon" aria-hidden="true" />
              <span>
                <span className="p2__srOnly">{typeof value === "string" ? `${label}: ` : ""}{included ? "Included. " : "Not included. "}</span>
                {typeof value === "string" ? value : label}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="p2__delivery"><FiClock aria-hidden="true" /><span>{delivery || "Delivery: tailored to your scope"}</span></div>
    </article>
  );
}

export default function Pricing({ embedded = false }) {
  const Heading = embedded ? "h2" : "h1";
  const [selectedService, setSelectedService] = useState(pricingServices[0].id);
  const service = pricingServices.find(({ id }) => id === selectedService) || pricingServices[0];
  const reduceMotion = useReducedMotion();
  const plansId = useId();
  const comparison = pricingComparisons[service.id];

  return (
    <section className="p2" id="pricing">
      <section className="p2__hero" aria-labelledby="pricing-title">
        <div className="p2__container">
          <span className="p2__pill"><span aria-hidden="true" /> Clear scope. Thoughtful pricing.</span>
          <Heading className="p2__title" id="pricing-title">
            Software, automation &amp; AI.<br /><span className="p2__titleAccent">Built around your goals.</span>
          </Heading>
          <p className="p2__subtitle">Software built for your business, at every stage.<br className="p2__desktopBreak" /> Choose your service. Find your fit. Let&apos;s make it happen.</p>
          <div className="p2__trust" aria-label="Included with every project">
            <span><FiCode aria-hidden="true" /> Modern technologies</span>
            <span><FiShield aria-hidden="true" /> {service.id === "consultation" ? "Focused, practical guidance" : "100% satisfaction guaranteed"}</span>
          </div>
        </div>
      </section>
      <section className="p2__plans" aria-label="Service pricing">
        <div className="p2__container">
          <div className="p2__selectorLabel" id="pricing-service-label">What are we building?</div>
          <div className="p2__serviceSelector" role="group" aria-labelledby="pricing-service-label">
            {pricingServices.map(({ id, label }) => {
              const Icon = serviceIcons[id];
              return <button key={id} type="button" className="p2__serviceOption" aria-pressed={selectedService === id} aria-controls={plansId} onClick={() => setSelectedService(id)}><Icon aria-hidden="true" />{label}</button>;
            })}
          </div>
          <p className="p2__srOnly" role="status" aria-atomic="true">Showing {service.label} pricing packages.</p>
          <div id={plansId} role="region" aria-label={`${service.label} pricing packages`}>
            <AnimatePresence mode="wait" initial={false}>
              <Motion.div
                key={service.id}
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -4 }}
                transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
              >
                <div className="p2__serviceIntro"><h2>{service.label}, built for you.</h2><p>{service.summary}</p></div>
                {service.layout === "consultation" ? (
                  <div className="p2__consultationGrid">
                    {service.plans.map((plan) => <ServiceOfferCard key={plan.id} plan={plan} serviceLabel={service.label} serviceId={service.id} />)}
                  </div>
                ) : (
                  <div className="p2__grid" style={{ "--p2-feature-count": comparison.length, "--p2-card-rows": comparison.length + 7 }}>
                    {service.plans.map((plan) => <PricingCard key={plan.id} plan={plan} serviceLabel={service.label} serviceId={service.id} comparison={comparison} />)}
                  </div>
                )}
                {service.id === "web-apps" && <ServiceOfferCard plan={shopifyPlan} serviceLabel="Web Apps" serviceId={service.id} promotion={shopifyPromotion} />}
                <div className="p2__terms">
                  <p>{service.layout === "consultation" ? "USD per hour · One-to-one sessions" : "Final pricing depends on scope & business needs."}</p>
                  {service.note && <p>{service.note}</p>}
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>
          <div className="p2__fineprint" id="pricing-contact">
            <div className="p2__contactIcon"><FiMessageSquare aria-hidden="true" /></div>
            <div className="p2__contactCopy"><h2>A different kind of project?</h2><p>Tell me what you have in mind. We&apos;ll find the right scope together.</p></div>
            <a className="p2__link" href="mailto:sadat.fullstack@gmail.com">Let&apos;s talk <FiArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </section>
  );
}
