// tailwind.config.js
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ...
	],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addComponents, theme }) {
		//const colors = theme('colors')
		const names = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'primary', 'secondary']
		const base = {
			'@apply inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors': {}
		}
		const comps = {}
		comps['.btn'] = {
			...base,
			color: 'var(--btn)',
			backgroundColor: 'color-mix(in oklch, var(--btn) 8%, white)',
			borderColor: 'color-mix(in oklch, var(--btn) 28%, transparent)'
		}
		comps['.btn:hover'] = { backgroundColor: 'color-mix(in oklch, var(--btn) 14%, white)' }
		comps['.dark .btn'] = {
			color: 'color-mix(in oklch, var(--btn) 75%, white)',
			backgroundColor: 'color-mix(in oklch, var(--btn) 18%, black)',
			borderColor: 'color-mix(in oklch, var(--btn) 35%, black)'
		}
		comps['.dark .btn:hover'] = { backgroundColor: 'color-mix(in oklch, var(--btn) 24%, black)' }
		names.forEach(n => { comps[`.button-${n}`] = { '--btn': theme(`colors.${n}.700`, '#52525b') } })
		addComponents(comps)
		console.log('Button colors generated')
	})],
}
