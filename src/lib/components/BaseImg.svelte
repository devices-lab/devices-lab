<script lang="ts">
	import PlaceholderImage from '$lib/components/PlaceholderImage.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Picture } from 'vite-imagetools';

	type Props = DefProps & {
		src?: string | Picture;
	};

	const { src, ...props }: Props = $props();
</script>

{#if typeof src === 'string'}
	<img {src} {...props} />
{:else if src}
	<enhanced:img {src} {...props} />
{:else}
	<PlaceholderImage {...props}/>
{/if}
