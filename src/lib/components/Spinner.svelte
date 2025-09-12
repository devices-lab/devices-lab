<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { ClassProp } from '$lib/utils/utils';
	import { Loader } from '@lucide/svelte';

	type Props = ClassProp & {
		loading: boolean;
	};

	const { loading, ...props }: Props = $props();
</script>

<ClassBox {props} role="status" class={loading ? 'block' : 'hidden'}>
	<Loader class="size-10 animate-spin text-blue-500" />
</ClassBox>
