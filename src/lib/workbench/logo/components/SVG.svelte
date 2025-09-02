<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		uid: string;
		width: number;
		height: number;
		children: Snippet;
		class?: ClassValue;
		[key: string]: any;
	}

	const { uid, width, height, children, class: className = '', ...restProps }: Props = $props();
</script>

<svg id={uid} class="mx-auto size-full {className}" width={width} height={height} viewBox={`${0} ${0} ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" {...restProps}>
	<g>
		{@render children()}
	</g>
</svg>
