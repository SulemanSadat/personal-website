import Portfolio from "../../components/Portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore Suleman Sadat's full-stack web applications, AI automation workflows, chatbots, mobile products and production software engineering projects.",
  alternates: { canonical: "/portfolio" },
  openGraph: { type: "website", title: "Software Engineering Portfolio | Suleman Sadat", description: "Explore Suleman Sadat's full-stack web applications, AI automation workflows, chatbots, mobile products and production software engineering projects.", url: "/portfolio" },
  twitter: { title: "Software Engineering Portfolio | Suleman Sadat", description: "Explore Suleman Sadat's full-stack web applications, AI automation workflows, chatbots, mobile products and production software engineering projects." },
};
export default function Page(){ return <Portfolio /> }
