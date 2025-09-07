<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils';
	import { Loader } from '@lucide/svelte';

	type Props = DefProps & {
		loading: boolean;
	};

	const { loading, ...props }: Props = $props();
</script>

<ClassBox {props} role="status" class={loading ? 'block' : 'hidden'}>
	<Loader class="size-10 animate-spin text-blue-500" />
</ClassBox>
