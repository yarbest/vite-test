import { defineConfig, loadEnv } from 'vite'
import { ViteUserConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import sassDts from 'vite-plugin-sass-dts'

// https://vite.dev/config/
// can pass a function to defineConfig, which would accept:
// command: 'build' | 'serve'; // mode: string; // isSsrBuild?: boolean; // isPreview?: boolean;
// and then return the config object, which can be changed based on the mode
// if (mode === 'production') base: '/vite-test'
// if (mode === 'development') base: '/'

// the function also can be async for api calls

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd()) // get env based on current mode dev/prod, .env.development/.env.production
  // console.log(env);
  return {
    plugins: [react(), sassDts()],
    resolve: {
      // without it, it will fail in browser if I use alias imports
      alias: {
        '@containers': path.resolve(__dirname, 'src/containers'),
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['src/setupTest.ts'],
    } as ViteUserConfig['test'],
    // needed fot github pages
    base: mode === 'production' ? '/vite-test' : '/', // adds to the url: http://localhost:5173/vite-test

    css: {
      devSourcemap: true, // during development, in browser, using scss, it will show the scss file, not the css file
    },

    // changes ports for dev server and preview server
    server: {
      port: 1111,
    },
    preview: {
      port: 2222,
    },

    // envDir: './env', // default is root which is -> .
    // envPrefix: 'APP_', // default is VITE_

    // build: {
    //   // default is dist, can be changed
    //   outDir: 'build',
    // },
  }
})
