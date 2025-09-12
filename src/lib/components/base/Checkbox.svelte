<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { TextProps } from '$lib/components/base/BaseText.svelte';
	import BaseText from '$lib/components/base/BaseText.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps2 } from '$lib/utils/utils';
	import { Check } from '@lucide/svelte';

	type Props = DefProps2 & {
		checked: boolean;
		text?: TextProps;
		name?: string;
	};

	let { checked = $bindable(false), text, name, ...rest }: Props = $props();
	const uid = $props.id();
</script>

<div {...rest.props} class={cn("flex items-center gap-4", rest.class)}>
	<div class="group grid size-4 grid-cols-1">
		<input id={`checkbox-input-${uid}`} type="checkbox" bind:checked {name} class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
		<Check class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" />
	</div>
	{#if text}
		<BaseText {...text} tag="label" props={{ ...text.props, for: `checkbox-input-${uid}` }} />
	{/if}
</div>
