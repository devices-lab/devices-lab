<script lang="ts">
	export interface TitleItem {
		title: string;
	}

	const { title }: TitleItem = $props();
</script>

<h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white wrap-break-word">{title}</h1>
