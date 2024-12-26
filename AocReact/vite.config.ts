/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true,
      strictPort: true,
      watch: {
        usePolling: true,
      },
      proxy: {
        '^/api': {
          target: `http://api:${env.VITE_API_PORT}`,
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './testSetup.ts',
      outputFile: './reports/junit.xml',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'cobertura'],
        reportsDirectory: './reports/coverage',
        exclude: [
          'node_modules/',
          'src/**/__tests__/'
        ],
      },
    }
  };
});
