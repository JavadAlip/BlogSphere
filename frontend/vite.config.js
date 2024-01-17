// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     outDir: 'frontend',
//     plugins: [react()],
//   },
// })


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'frontend', // Output directory for the build artifacts
    plugins: [react()], // Plugins to use during the build process, in this case, the React plugin
  },
});
