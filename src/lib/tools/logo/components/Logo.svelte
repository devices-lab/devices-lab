<script lang="ts">
	import { svgBackground, TEXT, LOGO_ICON } from '$lib/tools/logo/utils';

	import Text from '$lib/tools/logo/components/Text.svelte';

	export interface Props {
		x: number;
		y: number;
		fontSize: number;
		[key: string]: any;
	}

	const { x, y, fontSize, ...restProps }: Props = $props();
</script>

<Text x={x + 3} {y} text={LOGO_ICON} {fontSize} data-synthetic-bold="true" data-bold-strength="3.0" fill={$svgBackground === 'none' ? TEXT : $svgBackground} text-anchor="middle" {...restProps} />
