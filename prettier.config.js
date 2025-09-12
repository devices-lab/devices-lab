/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],

	tailwindStylesheet: './src/app.css',
	tailwindFunctions: ['clsx', 'cn', 'tw'],
	tailwindAttributes: ['clsx', 'cn', 'tw']
};
