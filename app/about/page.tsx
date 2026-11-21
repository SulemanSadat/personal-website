import About from "../../components/About";
import StructuredData from "../../components/StructuredData";
import { profilePageStructuredData } from "../../seo/siteMetadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Suleman Sadat, a software engineer with 4+ years of experience in full-stack development, automation, AI tools and remote product delivery.",
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", title: "About Suleman Sadat | Full-Stack Software Engineer", description: "Learn about Suleman Sadat, a software engineer with 4+ years of experience in full-stack development, automation, AI tools and remote product delivery.", url: "/about" },
  twitter: { title: "About Suleman Sadat | Full-Stack Software Engineer", description: "Learn about Suleman Sadat, a software engineer with 4+ years of experience in full-stack development, automation, AI tools and remote product delivery." },
};
export default function Page(){ return <><StructuredData data={profilePageStructuredData} /><About /></> }
