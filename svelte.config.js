import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			$devices: 'src/routes/[[devices=devices]]',
			$tools: 'src/routes/[[software=software]]',
			$media: 'src/routes/media',
			$research: 'src/routes/research',
			$workbench: 'src/routes/workbench',
		},
		adapter: adapter(
			{
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			}
		),
		paths: {
			base: process.argv.includes('dev') ? '/test' : process.env.BASE_PATH,
			relative: false
		},
	}
};

export default config;
