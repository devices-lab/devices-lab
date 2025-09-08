<script lang="ts">
	import IconLink from '$lib/components/icons/IconLink.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children?: Snippet;
		href: string;
		label: string;
		sublabel: string;
	};

	const { children, href, label, sublabel, ...props }: Props = $props();
</script>

<li class="space-x- flex flex-row items-start space-x-2">
	<div class="self-center">
		{@render children?.()}
	</div>

	<div class="flex flex-1 flex-col">
		<span class="font-semibold">{label}</span>

		<IconLink href={href} text={href} />
	
	</div>

	{#if sublabel}
		<span class="text-sm font-light text-gray-400">({sublabel})</span>
	{/if}
</li>
