<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import { Routes } from '$lib/data/routes';
	import type { DefProps } from '$lib/utils/utils';
	import SVG_Pill from '$lib/workbench/logo/SVG_Pill.svelte';
	import { LogoProps } from '$lib/workbench/logo/utils';

	type Props = DefProps & {
		height?: string;
	};

	const { height = 'h-8', ...props }: Props = $props();
	const linkClass = $derived(cn(height, props.class));
</script>

<BaseLink link={Routes.home.id} class={linkClass}>
	<span class="sr-only">DevicesLab</span>
	<SVG_Pill uid={'dl-name'} {...LogoProps()} />
</BaseLink>
