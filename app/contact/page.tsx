import Contact from "../../components/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Suleman Sadat to discuss a full-stack web application, AI automation workflow, chatbot, mobile app or technical consulting session.",
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", title: "Contact Suleman Sadat | Software Engineering Projects", description: "Contact Suleman Sadat to discuss a full-stack web application, AI automation workflow, chatbot, mobile app or technical consulting session.", url: "/contact" },
  twitter: { title: "Contact Suleman Sadat | Software Engineering Projects", description: "Contact Suleman Sadat to discuss a full-stack web application, AI automation workflow, chatbot, mobile app or technical consulting session." },
};
export default function Page(){ return <Contact /> }
