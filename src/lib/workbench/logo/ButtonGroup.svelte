<script lang="ts">
	const props = $props();
</script>

<span class="group isolate inline-flex rounded-md shadow-xs dark:shadow-none *:first:rounded-l-full *:last:rounded-r-full">
	{@render props.children?.()}
</span>
