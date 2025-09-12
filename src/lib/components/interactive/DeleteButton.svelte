<script lang="ts">
	import type { ButtonProps } from '$lib/components/base/BaseButton.svelte';
	import IconButton from '$lib/components/base/IconButton.svelte';
	import { cn } from '$lib/utils/cn';
	import { Trash2 } from '@lucide/svelte';

	const button: ButtonProps = $props();
</script>

<span class="sr-only">Delete</span>
<IconButton {...button} class={cn('link-red text-sm opacity-50', button.class)} tooltip={{ content: 'Delete' }} icon={{ icon: Trash2, class: 'size-5 ms-2' }} />
