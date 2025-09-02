<script lang="ts">
	import { STROKE, textWidth, PAD, COLOR, RADIUS } from '$lib/workbench/logo/utils';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Fill from '$lib/workbench/logo/components/Fill.svelte';
	import Logo from '$lib/workbench/logo/components/Logo.svelte';
	import Text from '$lib/workbench/logo/test/Text.svelte';
	import Rect from '$lib/workbench/logo/test/Rect.svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		uid: string;
		projectId: string;
		projectVersion: string;
		class?: ClassValue;
	}

	const { uid, projectId, projectVersion, class: className = '' }: Props = $props();

	const H = 132;
	const R = RADIUS; //H / 2;
	const fontSize = 90;
	const fontSizeDL = 120;

	const widthDL = $derived(Math.round(H * 1.5));
	const text = $derived(`${projectId}-${projectVersion}`);
	const W = $derived(STROKE + widthDL + PAD + textWidth(text, fontSize) + PAD * 2 + 8);
</script>

<SVG {uid} width={W} height={H} class={className}>
	<Rect width={W} height={H} rx={R} ry={R} />
	<Fill width={widthDL - STROKE / 2} height={H - STROKE} radius={R} corners={{ topLeft: true, topRight: false, bottomLeft: true, bottomRight: false }} />
	<Logo x={widthDL / 2} y={H / 2} fontSize={fontSizeDL} />
	<Text x={widthDL + PAD + 12} y={H / 2} {fontSize} fill={COLOR} {text} />
</SVG>
