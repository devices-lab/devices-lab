import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(
			{
				pages: 'build',
				assets: 'build',
				fallback: resolve('404.html'),
				precompress: false,
				strict: true
			}
		),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	}
};

export default config;
