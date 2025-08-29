<script lang="ts">
	export interface DescriptionItem {
		description: string;
	}

	const { description }: DescriptionItem = $props();
</script>

<div class="mt-6">
	<h3 class="sr-only">Description</h3>

	<div class="space-y-6 text-base text-gray-700 dark:text-gray-300">
		<p>{description}</p>
	</div>
</div>
