<script lang="ts">
	import BaseLink from '$lib/components/BaseLink.svelte';
	import SvgLogo from '$lib/workbench/logo/SVG_Logo.svelte';
	import { Routes } from '$lib/data/routes';

	const { height = 'h-10', ...props }: { height?: string; [key: string]: any } = $props();
</script>

<BaseLink href={Routes.home.href} class="-m-1.5 p-1.5 {props.class}">
	<span class="sr-only">DevicesLab</span>
	<SvgLogo uid={'dl-name'} class="h-8" props={{ class: 'fill-white dark:fill-gray-300' }} />
</BaseLink>
