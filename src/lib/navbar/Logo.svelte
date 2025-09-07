<script lang="ts">
	import BaseLink from '$lib/components/interactive/BaseLink.svelte';
	import SVG_Pill from '$lib/workbench/logo/SVG_Pill.svelte';
	import { Routes } from '$lib/data/routes';
	import { LogoProps } from '$lib/workbench/logo/utils';

	const { height = 'h-10', ...props }: { height?: string; [key: string]: any } = $props();
</script>

<BaseLink href={Routes.home.href} class="h-8 {props.class}">
	<span class="sr-only">DevicesLab</span>
	<SVG_Pill uid={'dl-name'} {...LogoProps()} />
</BaseLink>
