<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import type { DefProps } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		title: string;
		subtitle: string;
	};

	const { children, title, subtitle, ...props }: Props = $props();
</script>

<div {...props} class="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3 {props.class}">
	<div class="px-4 sm:px-0">
		<h2 class="text-base/7 font-semibold text-gray-900 dark:text-white">{title}</h2>
		<p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">{subtitle}</p>
	</div>

	<BaseCard class="md:col-span-2">
		<div class="px-4 py-6 sm:p-8 *:not-last:mb-4">
			{@render children()}
		</div>
	</BaseCard>
</div>
