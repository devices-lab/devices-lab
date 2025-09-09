<script lang="ts">
	import IconButton from '$lib/components/icons/IconButton.svelte';
	import type { ButtonType } from '$lib/components/interactive/BaseButton.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps } from '$lib/utils/utils';
	import { X } from '@lucide/svelte';

	type Props = DefProps & {
		onclick?: ButtonType;
	};

	const props: Props = $props();
	const iconClass = $derived(cn("link-gray text-sm opacity-50", props.class));
</script>

<span class="sr-only">Close</span>
<IconButton {...props} class={iconClass} icon={{ icon: X, class: 'size-8', tooltip: 'Close' }} />
