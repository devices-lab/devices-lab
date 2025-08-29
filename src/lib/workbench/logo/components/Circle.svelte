<script lang="ts">
	import { svgBackground, STROKE, COLOR } from '$lib/workbench/logo/utils';

	interface Props {
		diameter: number;
		[key: string]: any;
	}

	const { diameter, ...props }: Props = $props();
</script>

<circle id="subject" cx={diameter / 2} cy={diameter / 2} r={(diameter - STROKE) / 2} fill={$svgBackground} stroke={COLOR} stroke-width={STROKE} {...props} />
