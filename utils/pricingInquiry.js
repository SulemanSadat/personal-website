export function createPricingInquiry({ serviceLabel, plan, serviceId }) {
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
