import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
// export default defineConfig({
//   return {
//     base: "/scanjd/",
//     plugins: [
//       react(),
//       tailwindcss(),
//     ],

//   }

// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/scanjd/',

    plugins: [
      react(),
      tailwindcss(),
    ],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      chunkSizeWarningLimit: 1600  // In kB, adjust as needed
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});

