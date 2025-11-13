/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rarity-common': '#9CA3AF',
        'rarity-less-common': '#10B981',
        'rarity-uncommon': '#3B82F6',
        'rarity-rare': '#A855F7',
        'rarity-very-rare': '#F97316',
        'rarity-epic': '#DC2626',
      }
    },
  },
  plugins: [],
}
