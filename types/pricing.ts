export type ServiceId = "web-apps" | "automation" | "mobile-app" | "chatbots" | "consultation";
export type PackageServiceId = Exclude<ServiceId, "consultation">;
export type PlanId = "essential" | "recommended" | "bespoke" | "business" | "technical" | "shopify";
export type PackagePlanId = "essential" | "recommended" | "bespoke";

export interface PricingPlan {
  id: PlanId;
  name: string;
  desc: string;
  price: string;
  unit?: string;
  cta: string;
  badge?: string;
  session?: string;
  features: string[];
  featured?: boolean;
  discount?: string;
  note?: string;
}

export interface PackagePricingPlan extends PricingPlan {
  id: PackagePlanId;
}

interface PricingServiceBase {
  label: string;
  summary: string;
  note?: string;
}

export interface PackagePricingService extends PricingServiceBase {
  id: PackageServiceId;
  plans: PackagePricingPlan[];
}

export interface ConsultationPricingService extends PricingServiceBase {
  id: "consultation";
  layout: "consultation";
  plans: PricingPlan[];
}

export type PricingService = PackagePricingService | ConsultationPricingService;
export type ComparisonValue = string | boolean;

export interface PricingComparisonRow {
  id: string;
  label: string;
  values: Record<"essential" | "recommended" | "bespoke", ComparisonValue>;
  upgrade: boolean;
}

export interface PromotionConfig {
  expiresAt: string | null;
}
