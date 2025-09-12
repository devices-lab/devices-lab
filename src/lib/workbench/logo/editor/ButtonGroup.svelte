<script lang="ts">
	const props = $props();
</script>

<span class="group isolate inline-flex rounded-md shadow-xs *:first:rounded-l-full *:last:rounded-r-full dark:shadow-none">
	{@render props.children?.()}
</span>
