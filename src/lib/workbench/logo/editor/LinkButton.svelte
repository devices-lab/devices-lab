<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	import type { Icon } from '@lucide/svelte';
	import type { ClassValue } from 'svelte/elements';

	const props: { onclick: () => void; color: ClassValue; label: string; icon: typeof Icon } = $props();
</script>

<BaseButton theme="link-secondary" onclick={props.onclick} class="flex items-center text-sm justify-center">
	<props.icon class="mr-2 size-4 {props.color}" />
	{props.label}
</BaseButton>
