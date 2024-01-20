// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();
// export default defineConfig({
//   build: {
//     outDir: 'dist', // Output directory for the build artifacts
//     plugins: [react()],
//     define: {
//       'process.env.VITE_URL': JSON.stringify(process.env.VITE_URL),
//       'process.env.VITE_IMGFOLDER': JSON.stringify(process.env.VITE_IMGFOLDER),
//     },
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  build: {
    outDir: 'dist', // Output directory for the build artifacts
    plugins: [react()],
    define: {
      'import.meta.env.VITE_URL': JSON.stringify(process.env.VITE_URL),
      'import.meta.env.VITE_IMGFOLDER': JSON.stringify(process.env.VITE_IMGFOLDER),
    },
  },
});
