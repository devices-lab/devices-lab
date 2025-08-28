<script lang="ts">
	import SvgLogo from '$lib/tools/logo/SVG_Logo.svelte';
	import { Routes } from '$lib/routes';

	const { height = 'h-10', ...props }: { height?: string; [key: string]: any } = $props();
</script>

<a href={Routes.home.href} class="-m-1.5 p-1.5 {props.class}">
	<span class="sr-only">DevicesLab</span>
	<SvgLogo uid={'dl-name'} class="h-8" props={{ class: 'fill-white dark:fill-gray-300' }} />
</a>
