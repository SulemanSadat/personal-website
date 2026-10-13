export const siteUrl = "https://sulemansadat.com";
export const socialImage = `${siteUrl}/preview.jpg`;

export const seoPages = {
  "/": {
    title: "Suleman Sadat | Software Engineer & Tech Entrepreneur",
    description: "Suleman Sadat is a full-stack software engineer building production-ready web applications, AI automation systems and product-focused digital experiences.",
    type: "profile",
  },
  "/about": {
    title: "About Suleman Sadat | Full-Stack Software Engineer",
    description: "Learn about Suleman Sadat, a software engineer with 4+ years of experience in full-stack development, automation, AI tools and remote product delivery.",
    type: "profile",
  },
  "/portfolio": {
    title: "Software Engineering Portfolio | Suleman Sadat",
    description: "Explore Suleman Sadat's full-stack web applications, AI automation workflows, chatbots, mobile products and production software engineering projects.",
    type: "website",
  },
  "/pricing": {
    title: "Web, Automation & AI Services | Suleman Sadat",
    description: "Transparent pricing for web applications, automation, mobile apps, AI chatbots, Shopify stores and technical consulting by Suleman Sadat.",
    type: "website",
  },
  "/blog": {
    title: "Software Engineering & AI Articles | Suleman Sadat",
    description: "Articles from Suleman Sadat on full-stack software engineering, React performance, modern JavaScript, AI automation and building useful digital products.",
    type: "website",
  },
  "/contact": {
    title: "Contact Suleman Sadat | Software Engineering Projects",
    description: "Contact Suleman Sadat to discuss a full-stack web application, AI automation workflow, chatbot, mobile app or technical consulting session.",
    type: "website",
  },
  "/courses": {
    title: "Upcoming Technology Courses | Suleman Sadat",
    description: "Upcoming courses from Suleman Sadat covering programming, content production and ecommerce. Course enrolment is not yet open.",
    type: "website",
    noindex: true,
  },
};

export const indexableRoutes = ["/", "/about", "/portfolio", "/pricing", "/blog", "/contact"];

export function normalizePath(pathname = "/") {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return seoPages[clean] ? clean : null;
}

export function getPageMetadata(pathname) {
  const path = normalizePath(pathname);
  return path ? { ...seoPages[path], path, canonical: `${siteUrl}${path === "/" ? "" : path}` } : {
    title: "Page Not Found | Suleman Sadat",
    description: "The requested page could not be found.",
    path: pathname,
    canonical: `${siteUrl}${pathname}`,
    type: "website",
    noindex: true,
  };
}

export function getStructuredData(pathname) {
  const page = getPageMetadata(pathname);
  const person = {
    "@type": "Person", "@id": `${siteUrl}/#person`, name: "Suleman Sadat",
    url: siteUrl, image: socialImage, jobTitle: "Software Engineer",
    description: "Full-stack software engineer building web applications, automation systems and product-focused digital experiences.",
    knowsAbout: ["Full-stack development", "Software engineering", "React", "Next.js", "Laravel", "Node.js", "AI automation", "n8n", "OpenAI API", "SaaS product development"],
    sameAs: ["https://www.linkedin.com/in/suleman-sadat/", "https://github.com/SulemanSadat", "https://x.com/suleman_sadat_", "https://www.instagram.com/suleman_sadat_"],
  };
  const graph = [person, {
    "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl,
    name: "Suleman Sadat — Software Engineer", inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  }, {
    "@type": page.path === "/" || page.path === "/about" ? "ProfilePage" : "WebPage",
    "@id": `${page.canonical}#webpage`, url: page.canonical, name: page.title,
    description: page.description, isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` }, inLanguage: "en",
  }];
  if (page.path === "/portfolio") graph.push({
    "@type": "ItemList", "@id": `${siteUrl}/portfolio#projects`, name: "Software engineering projects by Suleman Sadat",
    itemListElement: [
      ["AZIZI JEWELLERY", "Full-stack jewellery platform built with Next.js, TypeScript, Laravel and PostgreSQL", "http://azizijewellery.co.uk/"],
      ["Student Management System", "Full-stack platform for student records, students and grades", "https://nationaloxford.com/"],
      ["CRM Automation Workflow", "Automated lead capture, qualification and sales notification workflow", "https://github.com/SulemanSadat/CRM-Lead-Automation-n8n"],
      ["Upwork Accelerator", "Chrome extension that displays client hire rates on Upwork job cards", "https://chromewebstore.google.com/detail/lpmgfgnefmaeaanofdjakdbemkieehgi"],
    ].map(([name, description, url], index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "SoftwareApplication", name, description, url, applicationCategory: "BusinessApplication", operatingSystem: "Web browser", author: { "@id": `${siteUrl}/#person` } } })),
  });
  if (page.path && page.path !== "/") graph.push({
    "@type": "BreadcrumbList", "@id": `${page.canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: page.title.split("|")[0].trim(), item: page.canonical },
    ],
  });
  return { "@context": "https://schema.org", "@graph": graph };
}
