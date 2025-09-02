<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import SvgPill from '$lib/workbench/logo/SVG_Pill.svelte';
	import { Routes } from '$lib/data/routes';
	import { LogoProps } from '$lib/workbench/logo/utils';

	const { height = 'h-10', ...props }: { height?: string; [key: string]: any } = $props();
</script>

<BaseLink href={Routes.home.href} class="h-8 {props.class}">
	<span class="sr-only">DevicesLab</span>
	<SvgPill uid={'dl-name'} {...LogoProps()} />
</BaseLink>
