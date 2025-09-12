<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps;

	const props: Props = $props();
</script>

<ClassBox {props} class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
	<svg class="mx-auto h-full w-full text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64">
		<rect width="100%" height="100%" fill="currentColor" />
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="#ffffff">No Image</text>
	</svg>
</ClassBox>
