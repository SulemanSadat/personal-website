import { useId } from "react";
import Link from "./SectionLink";
import { createPricingInquiry } from "../utils/pricingInquiry";
import { IconCheck as FiCheck, IconArrowUpRight as FiArrowUpRight, IconVideo as FiVideo, IconShoppingBag as FiShoppingBag, IconCode as FiCode, IconBriefcase as FiBriefcase } from "@tabler/icons-react";
import PromotionCountdown from "./PromotionCountdown";


export default function ServiceOfferCard({ plan, promotion, serviceLabel = "Shopify", serviceId = "shopify" }) {
  const titleId = useId();
  const isShopify = plan.id === "shopify";
  const Icon = isShopify ? FiShoppingBag : plan.id === "business" ? FiBriefcase : FiCode;
  const href = `/?${new URLSearchParams(createPricingInquiry({ serviceLabel, serviceId, plan })).toString()}#contact`;
  return (
    <article className={`service-offer ${isShopify ? "service-offer--shopify" : ""}`} aria-labelledby={titleId}>
      <div className="service-offer-intro">
        <div className="service-offer-kicker"><Icon aria-hidden="true" /><span>{plan.badge || "Commerce / Built to sell"}</span></div>
        <h3 id={titleId}>{plan.name}</h3>
        <p className="service-offer-description">{plan.desc}</p>
        <div className="service-offer-price">{plan.price}<span>{plan.unit || "/ setup"}</span></div>
        {plan.session && <p className="service-offer-session"><FiVideo aria-hidden="true" />{plan.session}</p>}
        {promotion && <PromotionCountdown expiresAt={promotion.expiresAt} />}
      </div>
      <div className="service-offer-details">
        <h4>{isShopify ? "Your store, thoughtfully set up" : "What we can cover"}</h4>
        <ul>{plan.features.map(feature => <li key={feature}><FiCheck aria-hidden="true" /><span>{feature}</span></li>)}</ul>
        {plan.note && <p className="service-offer-note">{plan.note}</p>}
        <div className="service-offer-action">
          <Link href={href} scroll={false} className="button-primary" aria-label={`${plan.cta} — ${plan.name}`}>{plan.cta}<FiArrowUpRight aria-hidden="true" /></Link>
          {!isShopify && <p>Request a time via the contact form.<br />Your appointment is confirmed by email.</p>}
        </div>
      </div>
    </article>
  );
}



