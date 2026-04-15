# Shahed Shahrier Portfolio

An offline-first, multi-page portfolio for GitHub Pages. The site uses only local assets and keeps each major section on its own landing page so the content is easier to scan and update.

## Pages

- `index.html` for the home landing page
- `about.html` for background and working style
- `achievements.html` for results and highlights
- `projects.html` for featured work areas
- `contact.html` for direct contact options
- `offline.html` for cached fallback browsing

## Offline-First Setup

- `service-worker.js` caches the site after the first visit
- `manifest.webmanifest` declares the app shell for browser install support
- `assets/icon.svg` provides a local icon with no external dependencies
- `styles.css` and `site.js` are shared across all pages

## Local Development

1. Clone the repository.
2. Open the project folder.
3. Serve it with any static server or open it through GitHub Pages.

If you want to test offline caching locally, use a simple static server instead of opening `index.html` directly from the file system.

## Notes

- The design intentionally avoids external fonts and remote assets.
- The structure is easy to extend with real case studies or additional pages later.
