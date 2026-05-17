# Shahed Shahrier Portfolio

Personal portfolio website for Shahed Shahrier, a BUP Computer Science and Engineering undergraduate focused on cybersecurity, CTF competitions, software development, and research. The site is built as a lightweight static GitHub Pages project with local assets, responsive styling, SEO metadata, and offline support.

Live site: [https://shahrier.tech/](https://shahrier.tech/)

## Overview

This repository contains a multi-page portfolio that presents Shahed's profile, education, achievements, certifications, projects, and contact information. It does not require a build pipeline or external runtime dependencies; every page is plain HTML, shared CSS, and shared JavaScript.

The design uses a terminal-inspired visual system with dark and light themes, animated reveal states, responsive layouts, and an interactive command terminal available across the site.

## Features

- Static multi-page portfolio suitable for GitHub Pages
- Responsive layout for desktop, tablet, and mobile screens
- Dark/light theme toggle persisted with `localStorage`
- Interactive portfolio terminal with commands such as `help`, `about`, `skills`, `fastfetch`, `projects`, and `contact`
- Offline-first behavior through a service worker and offline fallback page
- Web app manifest for install support
- SEO metadata, Open Graph tags, Twitter card metadata, canonical URLs, `robots.txt`, and `sitemap.xml`
- Local image, certificate, and achievement assets with no remote asset dependency for the portfolio shell

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home page with profile summary, focus areas, portrait, and quick actions |
| `about.html` | Personal background, technical stack, roles, and activities |
| `education.html` | Academic record and timeline |
| `achievements.html` | CTF and competition achievements grouped by inter-university, national, and international results |
| `certifications.html` | Professional and CTF certificates with image/PDF assets |
| `archive.html` | Placeholder area for future CTF writeups, build notes, and learning logs |
| `projects.html` | Featured projects including Digi-Land, Museum Database Web Application, and Circuit Weaver |
| `contact.html` | Email, GitHub, LinkedIn, and location/contact details |
| `offline.html` | Offline fallback shown when a cached navigation request cannot be served from the network |

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Service Worker API
- Web App Manifest
- GitHub Pages

There are no package manager files in this repository because the portfolio is intentionally dependency-free.

## Project Structure

```text
.
├── index.html
├── about.html
├── education.html
├── achievements.html
├── certifications.html
├── archive.html
├── projects.html
├── contact.html
├── offline.html
├── styles.css
├── site.js
├── service-worker.js
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── CNAME
└── assets/
    ├── achievements/
    ├── certificates/
    │   ├── ctf/
    │   ├── pdf/
    │   └── professional/
    ├── image1.png
    ├── profile-icon.png
    ├── apple-touch-icon.png
    └── project/media assets
```

## Local Development

Because this is a static site, you can preview it with any local static server.

Using Python:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly in a browser works for basic viewing, but service worker caching requires the site to be served over `localhost` or HTTPS.

## Offline Behavior

Offline support is handled by `service-worker.js`.

- `PRECACHE_URLS` lists the pages and assets cached during installation.
- Navigation requests try the network first, then fall back to a cached page.
- If a requested page is not cached and the network is unavailable, `offline.html` is returned.
- Same-origin static assets are served from cache when available and added to cache after successful network fetches.

When updating files referenced by the service worker, update the cache name, currently `shahed-portfolio-v26`, so browsers receive the fresh version.

## Deployment

This repository is ready for GitHub Pages.

1. Push changes to the GitHub repository.
2. Enable GitHub Pages from the repository settings.
3. Set the source branch, usually `main` with the root directory.
4. Configure the custom domain if needed.
5. Verify that `sitemap.xml`, canonical URLs, and `manifest.webmanifest` match the production domain.

## Updating Content

- Add or edit page content directly in the relevant `.html` file.
- Keep navigation links consistent across all pages when adding a new page.
- Add new shared styles to `styles.css`.
- Add shared behavior to `site.js`.
- Put images, certificates, and PDFs under `assets/`.
- If a new page or important asset should work offline, add it to `PRECACHE_URLS` in `service-worker.js`.
- Update `sitemap.xml` when adding or removing public pages.

## Contact

- Email: [shahrier.work2000@gmail.com](mailto:shahrier.work2000@gmail.com)
- GitHub: [Shahed-Shahrier](https://github.com/Shahed-Shahrier)
- LinkedIn: [shahed-shahrier](https://www.linkedin.com/in/shahed-shahrier/)

## License

No license file is currently included. All portfolio content, images, certificates, and personal materials should be treated as reserved unless a license is added.
