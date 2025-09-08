<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { svelteMap, tagMap } from '$lib/components/richtext/maps';
	import RichText from '$lib/components/richtext/RichText.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		description: string;
	};

	const { description, ...props }: Props = $props();
</script>

<ClassBox {props}>
	<p class="text-gray-700 dark:text-gray-300">
		<RichText source={description} {svelteMap} {tagMap} />
	</p>
</ClassBox>
