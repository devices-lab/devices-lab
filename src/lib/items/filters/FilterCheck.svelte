<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { Check } from '@lucide/svelte';

	type Props = DefProps & {
		name: string;
		label: string;
		checked: boolean;
	};

	let { name, label, checked = $bindable(), ...props }: Props = $props();
	const uid = $props.id();
</script>

<ClassBox {props} class="flex gap-3">
	<div class="flex h-5 shrink-0 items-center">
		<div class="group grid size-4 grid-cols-1">
			<input id={`checkbox-input-${uid}`} type="checkbox" bind:checked {name} class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
			<Check class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" />
		</div>
	</div>
	<label for={`checkbox-input-${uid}`} class="pr-6 text-sm font-medium whitespace-nowrap text-gray-900 normal-case">{label}</label>
</ClassBox>
