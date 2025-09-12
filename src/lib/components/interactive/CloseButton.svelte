<script lang="ts">
	import type { ButtonProps } from '$lib/components/base/BaseButton.svelte';
	import IconButton from '$lib/components/base/IconButton.svelte';
	import { cn } from '$lib/utils/cn';
	import { X } from '@lucide/svelte';

	const button: ButtonProps = $props();
</script>

<span class="sr-only">Close</span>
<IconButton {...button} class={cn('link-gray text-sm opacity-50', button.class)} icon={{ icon: X, class: 'size-8' }} />
