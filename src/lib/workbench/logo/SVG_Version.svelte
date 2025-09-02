<script lang="ts">
	import { STROKE, PAD, textWidth } from '$lib/workbench/logo/utils';
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
		props?: Record<string, any>;
	}

	const { uid, projectId, projectVersion, class: className = '', props = {} }: Props = $props();

	const H = 194;
	const fontSizeProject = 86;
	const fontSizeVersion = 86;
	const fontSizeDL = 150;

	const widthDL = $derived(Math.round(H * 1.22));
	const withText = $derived(Math.max(textWidth(projectId, fontSizeProject), textWidth(projectVersion, fontSizeVersion)) + PAD * 2);
	const W = $derived(STROKE + widthDL + withText + PAD + 8);
</script>

<SVG {uid} width={W} height={H} class={className}>
	<Rect width={W} height={H} {...props}/>
	<Fill width={widthDL - STROKE / 2} height={H - STROKE} corners={{ topLeft: true, topRight: false, bottomLeft: true, bottomRight: false }} />
	<Logo x={widthDL / 2} y={H / 2} fontSize={fontSizeDL} />
	<Text x={widthDL + PAD + 12} y={H / 2 - fontSizeProject / 2 + 4} fontSize={fontSizeProject} text={projectId} />
	<Text x={widthDL + PAD + 12} y={H / 2 + fontSizeVersion / 2 - 4} fontSize={fontSizeVersion} text={projectVersion} />
</SVG>
