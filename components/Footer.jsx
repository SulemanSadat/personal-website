"use client";
import Link from "./SectionLink";
import { IconBrandGithub as FaGithub, IconBrandInstagram as FaInstagram, IconBrandLinkedin as FaLinkedin, IconBrandX as FaXTwitter } from "@tabler/icons-react";

function Footer() {
  const currentYear = 2026;

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/suleman-sadat/', 
      label: 'LinkedIn',
      color: '#0A66C2'
    },
    { 
      icon: FaXTwitter, 
      href: 'https://www.x.com/suleman_sadat_', 
      label: 'Twitter',
      color: '#1DA1F2'
    },
    { 
      icon: FaInstagram, 
      href: 'https://www.instagram.com/suleman_sadat_', 
      label: 'Instagram',
      color: '#ff00eeff'
    },
      { 
      icon: FaGithub, 
      href: 'https://www.github.com/SulemanSadat', 
      label: 'GitHub',
      color: '#333'
    },
    
    
  ];

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#portfolio' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand-section">
            <div className="footer-brand">
              <h2 className="footer-brand-name">
                <Link href="/">Suleman Sadat<span className="footer-brand-dot">.</span></Link>
              </h2>
              <p className="footer-brand-tagline">
                Software engineer with 4+ years of experience building production-ready web applications for international clients. Capable of managing full-stack systems independently and supporting teams with technical solutions.
              </p>
            </div>
          </div>

          <div className="footer-navigation-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <nav className="footer-nav" aria-label="Footer navigation">
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="footer-nav-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-social-section">
            <h3 className="footer-section-title">Connect</h3>
            <div className="footer-social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="footer-social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p className="copyright-text">
              © {currentYear} Suleman Sadat. All rights reserved.
            </p>
          </div>
          <button type="button" className="back-to-top-button" onClick={scrollToTop} aria-label="Back to top">↑</button>

          {/* <div className="footer-back-to-top">
            <button
              onClick={scrollToTop}
              className="back-to-top-button"
              aria-label="Back to top"
            >
              <span>↑</span>
            </button>
          </div> */}
        </div>
      </div>
      <section className="mega-footer" aria-labelledby="mega-footer-name">
        <div className="mega-footer-glow" aria-hidden="true" />
        <div className="mega-footer-meta" aria-hidden="true">
          <span>INDEPENDENT DEVELOPER / PRODUCT BUILDER</span>
          <span>© {currentYear}</span>
        </div>
        <h2 className="mega-footer-name" id="mega-footer-name" aria-label="SULEMAN SADAT"><span>SULEMAN</span>{' '}<span>SADAT</span></h2>
      </section>
    </footer>
  );
}

export default Footer;

