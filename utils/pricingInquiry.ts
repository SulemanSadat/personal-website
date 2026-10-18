import type { PricingPlan } from "../types/pricing";

interface PricingInquiryInput {
  serviceLabel: string;
  plan: Pick<PricingPlan, "name" | "price">;
  serviceId: string;
}

export interface PricingInquiry {
  subject: string;
  message: string;
}

export function createPricingInquiry({ serviceLabel, plan, serviceId }: PricingInquiryInput): PricingInquiry {
  const isConsultation = serviceId === "consultation";

  if (isConsultation) {
    return {
      subject: `Consultation request — ${plan.name} (${plan.price}/hour)`,
      message: `Hello Suleman,\n\nI’d like to book a ${plan.name} consultation at ${plan.price} per hour. Please let me know your next available times and the best next step.\n\nBest,`,
    };
  }

  return {
    subject: `Inquiry: ${serviceLabel} — ${plan.name} (from ${plan.price})`,
    message: `Hello Suleman,\n\nI’m interested in the ${plan.name} package for ${serviceLabel}, starting from ${plan.price}. I’d like to discuss my project and confirm the best next step.\n\nBest,`,
  };
}
