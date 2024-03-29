// eslint-disable-next-line import/no-unresolved
import million from 'million/compiler';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd());
  return {
    plugins: [million.vite({ auto: true }), react()],
    server: {
      historyApiFallback: true,
    },
  };
});
