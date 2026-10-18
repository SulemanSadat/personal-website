import type { ComparisonValue, PackageServiceId, PricingComparisonRow } from "../types/pricing";

// Explicit comparisons avoid treating differently worded or unlisted basics as exclusions.
// A string is an included allowance; false means this upgrade is not in the package.
const row = (id: string, label: string, essential: ComparisonValue, recommended: ComparisonValue, bespoke: ComparisonValue, upgrade = false): PricingComparisonRow => ({
  id, label, values: { essential, recommended, bespoke }, upgrade,
});

export const pricingComparisons: Record<PackageServiceId, PricingComparisonRow[]> = {
  "web-apps": [
    row("scope", "Website scope", "1-page responsive landing", "Up to 5 pages", "Custom website scope"),
    row("components", "Custom pages & components", true, true, true, true),
    row("hosting", "Domain + Hosting", false, true, true, true),
    row("app", "Mobile App", false, true, true, true),
    row("animations", "Advanced animations / interactions", false, false, true, true),
    row("3d-design", "3D Design", false, false, true, true),
    row("integrations", "API integrations + auth", false, false, true, true),
    row("architecture", "Ecommerce Future", false, false, true, true),
    row("revisions", "Revisions", "2 revision round", "3 revision rounds", "Support & Revisions"),
  ],
  automation: [
    row("workflows", "Workflow capacity", "1 workflow with up to 3 steps", "Up to 3 connected workflows", "Up to 8 connected workflows"),
    row("apps", "Connected apps", "Connect 2 existing apps", "Up to 3 app integrations", "Up to 5 app integrations"),
    row("logic", "Data handling", "Basic data mapping", "Data mapping & filters", "Conditional logic & data validation"),
    row("integrations", "Custom API connections & webhooks", false, false, true, true),
    row("alerts", "Error handling", false, "Error notifications", "Error alerts & retry handling", true),
    row("documentation", "Documentation", "Testing & setup guide", "Workflow documentation", "VPS"),
    row("support", "30 days of post-launch support", false, false, true, true),
  ],
  "mobile-app": [
    row("screens", "Screen allowance", "Up to 3 screens", "Up to 8 screens", "Up to 15 custom screens"),
    row("platforms", "Shared iOS & Android codebase", true, true, true),
    row("accounts", "User accounts & authentication", false, "User sign-in & profiles", "User roles & authentication", true),
    row("integrations", "API integration", false, "Existing API integration", "Custom backend & API integrations", true),
    row("notifications", "Push notifications", false, true, "Push notifications & analytics", true),
    row("store", "App store submission assistance", false, true, true, true),
    row("payments", "Payments or subscription integration", false, false, true, true),
    row("support", "30 days of post-launch support", false, false, true, true),
  ],
  chatbots: [
    row("channels", "Deployment channels", "1 website chatbot", "Website or Telegram deployment", "Website + Telegram deployment"),
    row("knowledge", "AI knowledge base", false, "Knowledge base with up to 20 documents", "Knowledge base with up to 100 documents", true),
    row("tools", "Business tool integrations", false, false, "Up to 3 business tool integrations", true),
    row("actions", "Custom actions & API connections", false, false, true, true),
    row("handoff", "Human handoff", false, "Human handoff flow", "Fallbacks & human handoff", true),
    row("analytics", "Conversation logs & analytics", false, false, true, true),
    row("support", "30 days of post-launch support", false, false, true, true),
  ],
};
