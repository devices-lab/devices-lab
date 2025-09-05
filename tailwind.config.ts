/* eslint-disable @typescript-eslint/no-explicit-any */
import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

const buttonApply = plugin(({ addComponents, theme }) => {
	const palette = theme('colors') as Record<string, any>
	const names = Object.keys(palette).filter(
		n => !['inherit', 'current', 'transparent', 'black', 'white'].includes(n)
	)

	const apply = (classes: string) => ({ [`@apply ${classes}`]: {} })

	const comps: Record<string, any> = {
		/* Base recipe via @apply */
		'.btn': apply('inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors')
	}

	// Generate .button-{color} with light + dark variants via @apply
	names.forEach((n) => {
		comps[`.button-${n}`] = {
			...apply(`border-${n}-200 bg-${n}-50 text-${n}-700 hover:bg-${n}-100/60`),
			...apply(`dark:border-${n}-900/40 dark:bg-${n}-900/20 dark:text-${n}-300 dark:hover:bg-${n}-900/30`)
		}
	})

	// Optional semantic shorthands mapped to existing palette keys
	comps['.button-primary'] = { ...apply('border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100/60'), ...apply('dark:border-primary-900/40 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:bg-primary-900/30') }
	comps['.button-secondary'] = { ...apply('border-secondary-200 bg-secondary-50 text-secondary-700 hover:bg-secondary-100/60'), ...apply('dark:border-secondary-900/40 dark:bg-secondary-900/20 dark:text-secondary-300 dark:hover:bg-secondary-900/30') }

	addComponents(comps)
})

export default {
	content: ['./index.html', './src/**/*.{svelte,ts,js,tsx,jsx,vue}'],
	theme: { extend: {} },
	plugins: [buttonApply],
} satisfies Config