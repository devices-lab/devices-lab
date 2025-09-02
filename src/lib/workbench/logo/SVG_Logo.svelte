<script lang="ts">
	import { textWidth, STROKE, PAD, RADIUS, LOGO_NAME, svgBackground } from '$lib/workbench/logo/utils';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Fill from '$lib/workbench/logo/components/Fill.svelte';
	import Logo from '$lib/workbench/logo/components/Logo.svelte';
	import Text from '$lib/workbench/logo/test/Text.svelte';
	import Rect from '$lib/workbench/logo/test/Rect.svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		uid: string;
		class?: ClassValue;
		props?: Record<string, any>;
		[key: string]: any;
	}

	const { uid, class: className = '', props = {}, ...restProps }: Props = $props();

	const H = 176;
	const fontSize = 108;
	const fontSizeDL = 150;

	const widthDL = $derived(Math.round(H * 1.25));
	const withText = $derived(widthDL + PAD + textWidth(LOGO_NAME, fontSize) + PAD + 8);
	const W = $derived(withText + PAD * 2);
</script>

<SVG {uid} width={W} height={H} class={className}>
	<Rect width={W} height={H} {...props}/>
	<Fill width={widthDL - STROKE / 2} height={H - STROKE} corners={{ topLeft: true, topRight: false, bottomLeft: true, bottomRight: false }} />
	<Logo x={widthDL / 2} y={H / 2} fontSize={fontSizeDL} {...props}/>
	<Text x={widthDL + PAD + 20} y={H / 2} {fontSize} text={LOGO_NAME} />
</SVG>
