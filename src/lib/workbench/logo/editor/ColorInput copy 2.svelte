<script lang="ts">
	import ColorField from '$lib/workbench/logo/editor/ColorField.svelte';
	import Reset from '$lib/workbench/logo/editor/Reset.svelte';

	export interface ColorData {
		label: string;
		default: string;
	}

	export interface ColorInput {
		color0: string;
		color1: string;
		color2: string;
		dataColor0: ColorData;
		dataColor1: ColorData;
		dataColor2: ColorData;
	}

	let { color0 = $bindable(), color1 = $bindable(), color2 = $bindable(), dataColor0, dataColor1, dataColor2 }: ColorInput = $props();
</script>

<div class="flex justify-between gap-x-3">
	<div class="flex grow flex-col gap-3 sm:flex-row">
		<ColorField bind:color={color0} label={dataColor0.label} />
		<ColorField bind:color={color1} label={dataColor1.label} />
		<ColorField bind:color={color2} label={dataColor2.label} />
	</div>

	<Reset
		onclick={() => {
			color0 = dataColor0.default;
			color1 = dataColor1.default;
			color2 = dataColor2.default;
		}}
	/>
</div>
