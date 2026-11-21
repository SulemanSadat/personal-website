import Pricing from "../pages/Pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Transparent pricing for web applications, automation, mobile apps, AI chatbots, Shopify stores and technical consulting by Suleman Sadat.",
  alternates: { canonical: "/pricing" },
  openGraph: { type: "website", title: "Web, Automation & AI Services | Suleman Sadat", description: "Transparent pricing for web applications, automation, mobile apps, AI chatbots, Shopify stores and technical consulting by Suleman Sadat.", url: "/pricing" },
  twitter: { title: "Web, Automation & AI Services | Suleman Sadat", description: "Transparent pricing for web applications, automation, mobile apps, AI chatbots, Shopify stores and technical consulting by Suleman Sadat." },
};
export default function Page(){ return <Pricing /> }
