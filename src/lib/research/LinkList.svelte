<script lang="ts">
	import type { Link } from '$lib/data/research';
	import { type DefProps } from '$lib/utils';
	import IconLink from '$lib/components/IconLink.svelte';

	type Props = DefProps & {
		links: Link[];
	};

	const { links, ...props }: Props = $props();

	const toLower = (s?: string) => (s ? s.toLowerCase() : '');

	function pickVariant(link: Link): 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'slate' {
		const t = toLower(link.title);
		const i = toLower(link.icon as any);
		const h = toLower(link.href);
		if (t.includes('doi') || i.includes('doi')) return 'purple';
		if (t.includes('pdf') || h.endsWith('.pdf')) return 'rose';
		if (t.includes('code') || i.includes('github') || h.includes('github')) return 'emerald';
		if (t.includes('video') || h.includes('youtube') || h.includes('vimeo')) return 'amber';
		if (t.includes('slides') || t.includes('poster')) return 'slate';
		return 'blue';
	}

	const chipBase = ['inline-flex items-center gap-1.5 rounded-lg shadow-sm border px-2.5 py-1', 'text-sm font-medium transition-colors duration-150', 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'].join(' ');

	function variantClasses(v: ReturnType<typeof pickVariant>) {
		switch (v) {
			case 'purple':
				return 'border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100/60 dark:border-purple-900/40 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30';
			case 'emerald':
				return 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/60 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30';
			case 'rose':
				return 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100/60 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/30';
			case 'amber':
				return 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100/60 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30';
			case 'slate':
				return 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100/60 dark:border-slate-900/40 dark:bg-slate-900/20 dark:text-slate-300 dark:hover:bg-slate-900/30';
			default:
				return 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100/60 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30';
		}
	}
</script>

{#if links.length}
	<ul {...props} class="flex flex-wrap items-center justify-start gap-2 sm:gap-3 {props.class}" role="">
		{#each links as link}
			<li role="">
				<IconLink {...link} class={`group/link hover:-translate-y-0.5 ${chipBase} ${variantClasses(pickVariant(link))}`} aria-label={link.title} target="_blank" rel="noopener noreferrer" />
			</li>
		{/each}
	</ul>
{/if}
