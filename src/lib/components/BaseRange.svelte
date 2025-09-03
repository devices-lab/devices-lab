<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import BaseInput from './BaseInput.svelte';

	interface Props {
		value?: string | number;
		class?: ClassValue;
		[key: string]: any;
	}

	let { value = $bindable(), class: className = '', ...props }: Props = $props();
</script>

<BaseInput bind:value type="range" class={`outline-none not-disabled:cursor-pointer ${className}`} {...props} />