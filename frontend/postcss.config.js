// PostCSS configuration for Tailwind CSS v4 plugin separation
// Tailwind CSS v4: use the dedicated PostCSS plugin package.
// Use object form so react-scripts/PostCSS names the plugins explicitly.
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
