<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import { Loader } from '@lucide/svelte';

	type Props = DefProps & {
		loading: boolean;
	};

	const { loading, ...props }: Props = $props();

	let loadingIndicator = $state() as HTMLDivElement;
</script>

<div {...props} role="status" class="{loading ? 'block' : 'hidden'} {props.class}" bind:this={loadingIndicator}>
	<Loader class="size-10 animate-spin text-blue-500" />
</div>
