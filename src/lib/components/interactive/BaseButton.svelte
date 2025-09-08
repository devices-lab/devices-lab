<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type BaseButtonProps = {
		onclick: () => void;
	};

	type Props = DefProps &
		BaseButtonProps & {
			children: Snippet;
		};

	const { children, ...props }: Props = $props();
</script>

<ClassBox {props} tag="button" type="button">
	{@render children?.()}
</ClassBox>
