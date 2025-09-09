<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import PlaceholderImage from './PlaceholderImage.svelte';

	const { src, ...props }: { src: string | Picture | undefined; [key: string]: any } = $props();
</script>

{#if typeof src === 'string'}
	<img {src} {...props} />
{:else if src}
	<enhanced:img {src} {...props} />
{:else}
	<PlaceholderImage />
{/if}
