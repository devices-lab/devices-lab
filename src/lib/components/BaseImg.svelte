<script lang="ts">
	import type { Picture } from 'vite-imagetools';

	const { src, ...restProps }: { src: string | Picture; [key: string]: any } = $props();
</script>

{#if typeof src === 'string'}
	<img {src} {...restProps} />
{:else if src}
	<enhanced:img {src} {...restProps} />
{/if}
