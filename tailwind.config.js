/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette that can be used alongside DaisyUI
        'course-primary': '#3b82f6',    // Blue for primary elements
        'course-secondary': '#8b5cf6',  // Purple for secondary elements
        'course-accent': '#f59e0b',     // Amber for accents/highlights
        'course-neutral': '#1f2937',    // Dark gray for text
        'course-base': '#f3f4f6',       // Light gray for backgrounds
        'paper': '#f5f5dc', // Light beige for paper-like background
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        courseSchedule: {
          "primary": "#3b82f6",
          "secondary": "#8b5cf6",
          "accent": "#f59e0b",
          "neutral": "#1f2937",
          "base-100": "#f3f4f6",
          "base-200": "#e5e7eb",
          "base-300": "#d1d5db",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      "light",  // Include default light theme as fallback
      "dark",   // Include dark theme for dark mode support
    ],
  },
};
