import type { Metadata } from "next";
import "./globals.css";
import "../styles/App.css";
import "../styles/Navbar.css";
import "../styles/Home.css";
import "../styles/HireButton.css";
import "../styles/Testimonials.css";
import "../styles/Pricing.css";
import "../styles/ServiceOfferCard.css";
import "../styles/About.css";
import "../styles/SkillsShowcase.css";
import "../styles/Portfolio.css";
import "../styles/Contact.css";
import "../styles/Footer.css";
import "../styles/Blog.css";
import "../styles/CourseHighlights.css";
import "../styles/NotFound.css";
import "../styles/ContextMenu.css";
import "../styles/CinematicHome.css";
import "../styles/studio.css";
import "../styles/FirstVisitPreloader.css";
import FirstVisitPreloader from "../components/FirstVisitPreloader";
import ClientApp from "./_components/ClientApp";
import { assetPath, siteUrl } from "../lib/site-path";

const socialImageUrl = new URL("preview.jpg", `${siteUrl}/`).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Suleman Sadat | Software Engineer & Tech Entrepreneur", template: "%s | Suleman Sadat" },
  description: "Suleman Sadat is a full-stack software engineer building production-ready web applications, AI automation systems and product-focused digital experiences.",
  applicationName: "Suleman Sadat Portfolio",
  authors: [{ name: "Suleman Sadat" }],
  creator: "Suleman Sadat",
  alternates: { canonical: "/" },
  openGraph: { type: "profile", locale: "en_GB", siteName: "Suleman Sadat Portfolio", title: "Suleman Sadat | Software Engineer & Tech Entrepreneur", description: "Full-stack software engineer building production-ready web applications, AI automation systems and product-focused digital experiences.", url: siteUrl, images: [{ url: socialImageUrl, width: 1200, height: 630, alt: "Suleman Sadat software engineering portfolio" }] },
  twitter: { card: "summary_large_image", creator: "@Suleman_Sadat_", title: "Suleman Sadat | Software Engineer & Tech Entrepreneur", description: "Full-stack software engineer building web applications, AI automation systems and product-focused digital experiences.", images: [socialImageUrl] },
  icons: { icon: [{ url: assetPath("/favicon.jpg"), type: "image/jpeg" }], apple: assetPath("/favicon.jpg") },
  manifest: assetPath("/manifest.webmanifest"),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: `(function(){var h=document.documentElement;h.dataset.opening="pending";try{if(sessionStorage.getItem("suleman-studio-opening-v1")==="seen")h.dataset.opening="complete";}catch{}var saved=null;try{saved=localStorage.getItem("suleman-portfolio-theme");}catch{}h.dataset.theme=saved==="light"||saved==="dark"?saved:(matchMedia("(max-width: 999px)").matches?"dark":"light");}());` }} />
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
    </head>
    <body><FirstVisitPreloader /><ClientApp>{children}</ClientApp><noscript><style>{'.studio-opening{display:none!important}html[data-opening="pending"]{overflow:auto}'}</style></noscript></body>
  </html>;
}


