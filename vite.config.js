import million from 'million/compiler';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd());
  return {
    plugins: [million.vite({ auto: true }), react()],
  };
});
