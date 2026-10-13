# Suleman Sadat

**Personal Website**

🌐 **[Visit Website](https://SulemanSadat.github.io/personal-website/)** · [GitHub](https://github.com/SulemanSadat)

---

## ✨ The Website

Designed with simplicity, performance, and interaction in mind.

- 🌐 Modern, responsive experience
- 🧊 Interactive 3D elements
- 🎨 Refined light and dark themes
- ⚡ Smooth animations and transitions
- 📱 Thoughtful mobile experience

## 🛠️ Built With

**Next.js** · **React** · **TypeScript** · **Tailwind CSS** · **Three.js** · **React Three Fiber** · **GSAP** · **Framer Motion**

---

**© 2026 Suleman Sadat. All rights reserved.**

---

## Deployment

The project has two intentionally separate build targets:

- Production (`https://sulemansadat.com/`): `npm run build:production` followed by the normal Next.js hosting provider deployment. This keeps server-capable Next.js behavior and image optimization enabled.
- GitHub Pages (`https://sulemansadat.github.io/personal-website/`): `npm run build:pages`. This creates the static `out/` directory with the `/personal-website/` base path, trailing-slash routes, correctly prefixed public assets, and unoptimized `next/image` output.

To publish the Pages export manually, run the Pages workflow from GitHub Actions or push a reviewed commit to `main` after enabling **Settings → Pages → Build and deployment → GitHub Actions**. The included workflow installs dependencies, runs `npm run build:pages`, and deploys only `out/`.

Before publishing a Pages build locally, run:

```bash
npm run build:pages
npm run test:pages-export
```

### Hosting notes

- GitHub Pages is static-only: it cannot run Next.js server routes, server actions, default image optimization, redirects, rewrites, or request-time data. This project currently avoids those features in its Pages build.
- Static hosting must serve the `out/` directory at the repository Pages URL; do not deploy `.next/`.
- The Pages workflow is configured but has not been run or deployed by this change.
