// All service content lives here; plan IDs stay stable when display names change.
import type { PricingPlan, PricingService, PromotionConfig } from "../types/pricing";

export const pricingServices: PricingService[] = [
  {
    "id": "web-apps",
    "label": "Web Apps",
    "plans": [
      {
        "name": "Web Presence",
        "desc": "Perfect for freelancers & personal brands.",
        "price": "$199",
        "unit": "starting",
        "cta": "Get started",
        "featured": false,
        "features": [
          "1-page responsive landing",
          "Basic SEO setup",
          "Basic Security",
          "CMS setup",
          "Website only",
          "Contact form",
          "2 revision round",
          "Delivery: 1–3 weeks"
        ],
        "id": "essential"
      },
      {
        "name": "Business Website",
        "desc": "Best for small businesses that want a polished presence.",
        "price": "$599",
        "discount": "-45% OFF",
        "unit": "starting",
        "cta": "Get started",
        "featured": true,
        "badge": "Most popular",
        "features": [
          "Up to 5 pages",
          "Domain + Hosting",
          "Website & App",
          "Mobile-Friendly UI",
          "Custom pages & components",
          "Performance & SEO",
          "3 revision rounds",
          "Delivery: 2–4 weeks"
        ],
        "id": "recommended"
      },
      {
        "name": "Web Platform",
        "desc": "For serious projects with custom requirements.",
        "price": "$1499",
        "unit": "starting",
        "cta": "Request Custom Quote",
        "featured": false,
        "features": [
          "Custom pages & components",
          "Domain + Hosting",
          "Website & App",
          "Advanced animations / interactions",
          "API integrations + auth",
          "Best-practice architecture",
          "3D Design",
          "Hosting management",
          "Support & Revisions"
        ],
        "id": "bespoke"
      }
    ],
    "summary": "From a standout first impression to a full-scale digital product."
  },
  {
    "id": "automation",
    "label": "Automation",
    "note": "Third-party subscriptions and usage fees are quoted separately.",
    "plans": [
      {
        "name": "Task Flow",
        "desc": "Save time with one reliable, everyday automation.",
        "price": "$149",
        "unit": "starting",
        "cta": "Get started",
        "featured": false,
        "features": [
          "1 workflow with up to 3 steps",
          "Connect 2 existing apps",
          "Scheduled or event-based trigger",
          "Basic data mapping",
          "Testing & setup guide",
          "2 revision rounds",
          "Delivery: 3–5 business days"
        ],
        "id": "essential"
      },
      {
        "name": "Workflow Suite",
        "desc": "Connect your tools and automate repetitive team tasks.",
        "price": "$499",
        "unit": "starting",
        "cta": "Get started",
        "featured": true,
        "badge": "Best for teams",
        "features": [
          "Up to 3 connected workflows",
          "Up to 3 app integrations",
          "Multi-step triggers & actions",
          "Data mapping & filters",
          "Error notifications",
          "Workflow documentation",
          "3 revision rounds",
          "Delivery: 1–2 weeks"
        ],
        "id": "recommended"
      },
      {
        "name": "Operations Engine",
        "desc": "Custom automation for complex operations across your business.",
        "price": "$1299",
        "unit": "starting",
        "cta": "Request Custom Quote",
        "featured": false,
        "badge": "Advanced workflows",
        "features": [
          "Up to 8 connected workflows",
          "Up to 5 app integrations",
          "Custom API connections & webhooks",
          "Conditional logic & data validation",
          "Error alerts & retry handling",
          "Documentation & team handover",
          "3 revision rounds",
          "30 days of post-launch support",
          "Delivery: 3–5 weeks"
        ],
        "id": "bespoke"
      }
    ],
    "summary": "Less repetitive work. More room to move your business forward."
  },
  {
    "id": "mobile-app",
    "label": "Mobile App",
    "note": "App store accounts, hosting and third-party usage fees are quoted separately. Store review times are additional.",
    "plans": [
      {
        "name": "App Prototype",
        "desc": "Validate your idea with a focused mobile app.",
        "price": "$799",
        "unit": "starting",
        "cta": "Get started",
        "featured": false,
        "features": [
          "Up to 3 screens",
          "Shared iOS & Android codebase",
          "Custom responsive interface",
          "Local data storage",
          "Core navigation & device testing",
          "Installable test builds",
          "2 revision rounds",
          "Delivery: 2–3 weeks"
        ],
        "id": "essential"
      },
      {
        "name": "Mobile MVP",
        "desc": "Launch a connected MVP for your growing business.",
        "price": "$1999",
        "unit": "starting",
        "cta": "Get started",
        "featured": true,
        "badge": "MVP favorite",
        "features": [
          "Up to 8 screens",
          "Shared iOS & Android codebase",
          "User sign-in & profiles",
          "Existing API integration",
          "Push notifications",
          "App store submission assistance",
          "3 revision rounds",
          "Delivery: 5–7 weeks"
        ],
        "id": "recommended"
      },
      {
        "name": "Complete App",
        "desc": "A tailored mobile product with a scalable backend.",
        "price": "$3999",
        "unit": "starting",
        "cta": "Request Custom Quote",
        "featured": false,
        "badge": "Full product",
        "features": [
          "Up to 15 custom screens",
          "Shared iOS & Android codebase",
          "Custom backend & API integrations",
          "User roles & authentication",
          "Payments or subscription integration",
          "Push notifications & analytics",
          "App store submission assistance",
          "3 revision rounds",
          "30 days of post-launch support",
          "Delivery: 8–12 weeks"
        ],
        "id": "bespoke"
      }
    ],
    "summary": "Turn your idea into an app your customers can take anywhere."
  },
  {
    "id": "chatbots",
    "label": "Chatbots",
    "note": "AI model usage, hosting and messaging platform fees are quoted separately.",
    "plans": [
      {
        "name": "FAQ Assistant",
        "desc": "Handle FAQs and capture leads around the clock.",
        "price": "$249",
        "unit": "starting",
        "cta": "Get started",
        "featured": false,
        "features": [
          "1 website chatbot",
          "Rule-based flows for up to 20 FAQs",
          "Welcome message & quick replies",
          "Lead capture form",
          "Email notifications",
          "Setup & handover guide",
          "2 revision rounds",
          "Delivery: 5–7 business days"
        ],
        "id": "essential"
      },
      {
        "name": "Knowledge Assistant",
        "desc": "Answer customer questions with a knowledge-based AI bot.",
        "price": "$699",
        "unit": "starting",
        "cta": "Get started",
        "featured": true,
        "badge": "AI favorite",
        "features": [
          "Website or Telegram deployment",
          "Knowledge base with up to 20 documents",
          "Branded conversation interface",
          "Lead capture integration",
          "Human handoff flow",
          "Response testing & fallback messages",
          "3 revision rounds",
          "Delivery: 2–3 weeks"
        ],
        "id": "recommended"
      },
      {
        "name": "AI Concierge",
        "desc": "A custom AI assistant connected to your business tools.",
        "price": "$1799",
        "unit": "starting",
        "cta": "Request Custom Quote",
        "featured": false,
        "badge": "Connected AI",
        "features": [
          "Website + Telegram deployment",
          "Knowledge base with up to 100 documents",
          "Up to 3 business tool integrations",
          "Custom actions & API connections",
          "Conversation logs & analytics",
          "Fallbacks & human handoff",
          "Admin training & documentation",
          "3 revision rounds",
          "30 days of post-launch support",
          "Delivery: 4–6 weeks"
        ],
        "id": "bespoke"
      }
    ],
    "summary": "Helpful conversations that turn questions into opportunities."
  },
  {
    id: "consultation",
    label: "Consultation",
    layout: "consultation",
    summary: "A focused conversation. A clearer next step.",
    note: "General education and guidance only, not regulated financial, investment, legal or tax advice. No earnings, trading returns or registration outcomes are guaranteed.",
    plans: [
      {
        id: "business",
        name: "Business Consulting",
        desc: "Talk through your business ideas, questions and next steps.",
        price: "$80",
        unit: "/ hour",
        cta: "Request a business session",
        badge: "Business & entrepreneurship",
        session: "60-minute session · Google Meet",
        features: ["Business plan guidance", "Financial markets education", "Amazon & Dropshipping advice", "LLC Formation / Company Registration guidance", "Trading education", "Upwork freelancing strategies", "Consultation via Google Meet"],
      },
      {
        id: "technical",
        name: "Career Consulting",
        desc: "Get direction for your engineering skills and career.",
        price: "$30",
        unit: "/ hour",
        cta: "Request a technical session",
        badge: "Engineering & career",
        session: "60-minute session · Google Meet",
        features: ["Software engineering career roadmap", "Technical skill development guidance", "Career planning and mentorship", "Consultation via Google Meet"],
      },
    ],
  }
];

export const shopifyPlan: PricingPlan = {
  id: "shopify",
  name: "Shopify Store",
  desc: "A considered storefront, ready for your first customers.",
  price: "$200",
  cta: "Start my Shopify store",
  features: ["Product listing", "Custom paid theme installation", "Professional homepage setup and design", "Store configuration", "Domain connection"],
  note: "Theme license, Shopify subscription and domain purchase costs are excluded. Product count and delivery schedule are agreed before work begins.",
};

// Use a real campaign deadline in ISO 8601 with an explicit Z or UTC offset.
// Leave null until the owner confirms one. Never derive this from visit time.
export const shopifyPromotion: PromotionConfig = { expiresAt: null };
