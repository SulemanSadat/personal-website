import Blog from "../pages/Blog";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Software Engineering & AI Articles", description: "Articles from Suleman Sadat on full-stack software engineering, React performance, modern JavaScript, AI automation and building useful digital products.", alternates: { canonical: "/blog" }, openGraph: { type: "website", url: "/blog" } };
export default function Page() { return <Blog />; }
