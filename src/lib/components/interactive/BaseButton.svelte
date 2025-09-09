<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type ButtonType = () => void;

	export type ButtonProps = DefProps & {
		onclick?: ButtonType;
	};

	type Props = ButtonProps & {
		children: Snippet;
	};

	const { children, ...props }: Props = $props();


</script>

<ClassBox {props} tag="button" class="cursor-pointer" type="button">
	{@render children?.()}
</ClassBox>
