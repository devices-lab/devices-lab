<script lang="ts">
	import { svgBackground, TEXT, LOGO_ICON } from '$lib/workbench/logo/utils';

	import Text from '$lib/workbench/logo/test/Text.svelte';

	export interface Props {
		x: number;
		y: number;
		fontSize: number;
		[key: string]: any;
	}

	const { x, y, fontSize, ...restProps }: Props = $props();
</script>

<Text x={x + 3} {y} text={LOGO_ICON} {fontSize} data-synthetic-bold="true" data-bold-strength="1.5" fill={$svgBackground === 'none' ? TEXT : $svgBackground} text-anchor="middle" {...restProps} />
