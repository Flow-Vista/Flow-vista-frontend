import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcss from '@tailwindcss/postcss';  

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcss,           
        tailwindcss,
        autoprefixer
      ],
    },
    optimizeDeps: {
      include: ['jwt-decode'], 
    },
  },
});
