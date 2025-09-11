<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { TextProps, TextType } from '$lib/components/icons/TextItem.svelte';
	import TextItem from '$lib/components/icons/TextItem.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { Check } from '@lucide/svelte';

	type Props = DefProps & {
		checked: boolean;
		name?: string;
		label?: TextType | TextProps;
	};

	let { checked = $bindable(false), name, label, ...props }: Props = $props();
	const uid = $props.id();
</script>

<ClassBox {props} class="flex items-center gap-4">
	<div class="group grid size-4 grid-cols-1">
		<input id={`checkbox-input-${uid}`} type="checkbox" bind:checked {name} class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
		<Check class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" />
	</div>
	<TextItem text={label} tag="label" for={`checkbox-input-${uid}`} />
</ClassBox>
