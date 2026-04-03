/**
 * Next.js configuration for static export to GitHub Pages.
 * The `output: 'export'` option tells Next.js to generate a fully static site
 * that can be served from any static host (including GitHub Pages).
 */
module.exports = {
  output: 'export',
  // Disable the built‑in Image Optimization which requires a server.
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages sub-path hosting
  basePath: '/derm-india-ai',
  assetPrefix: '/derm-india-ai/',
};
