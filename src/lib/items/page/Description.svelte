<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		description: string;
	};

	const { description, ...props }: Props = $props();
</script>

<ClassBox {props} class="mt-6">
	<div class="space-y-6 text-base text-gray-700 dark:text-gray-300">
		<p>{description}</p>
	</div>
</ClassBox>
