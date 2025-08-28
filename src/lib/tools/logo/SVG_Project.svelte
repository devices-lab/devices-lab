<script lang="ts">
	import { svgBackground, textWidth, STROKE, PAD, TEXT, LOGO_DOMAIN } from '$lib/tools/logo/utils';
	import SVG from '$lib/tools/logo/components/SVG.svelte';
	import Fill from '$lib/tools/logo/components/Fill.svelte';
	import Text from '$lib/tools/logo/components/Text.svelte';
	import Rect from '$lib/tools/logo/components/Rect.svelte';
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		uid: string;
		projectName: string;
		class?: ClassValue;
		props?: Record<string, any>;
		[key: string]: any;
	}

	const { uid, projectName, class: className = '', props = {}, ...restProps }: Props = $props();

	const Hh = 120;
	const Hb = 120;
	const headerSize = 84;
	const bodySize = 84;

	const headerW = $derived(textWidth(LOGO_DOMAIN, headerSize));
	const projectW = $derived(textWidth(`/${projectName}`, bodySize));
	const contentW = $derived(Math.max(headerW, projectW));

	const innerW = $derived(contentW + PAD * 2);
	const W = $derived(innerW + PAD * 2);
	const H = $derived(Hh + Hb);

	const fill = $derived($svgBackground === 'none' ? TEXT : $svgBackground);

	const xHeader = $derived((contentW - headerW) / 2 + PAD * 2);
	const yHeader = $derived(Hh / 2);
	const xProject = $derived((contentW - projectW) / 2 + PAD * 2);
	const yProject = $derived(Hh + (Hb - STROKE) / 2);

	/*
		<Text x={STROKE / 2 + PAD} y={STROKE / 2 + Hh / 2} fontSize={headerSize} text={LOGO_DOMAIN} fill={fill} data-synthetic-bold="true" data-bold-strength="1.0"  />
		<Text x={STROKE / 2 + PAD} y={STROKE / 2 + Hh + Hb / 2} fontSize={bodySize} text={`/${projectName}`} />
	*/
</script>

<SVG {uid} width={W} height={H} class={className}>
	<Rect width={W} height={H} {...props}/>
	<Fill width={W - STROKE} height={Hh - STROKE / 2} corners={{ topLeft: true, topRight: true, bottomLeft: false, bottomRight: false }} />
	<Text x={xHeader} y={yHeader} fontSize={headerSize} text={LOGO_DOMAIN} {fill} data-synthetic-bold="true" data-bold-strength="1.0" {...props}/>
	<Text x={xProject} y={yProject} fontSize={bodySize} text={`/${projectName}`} />
</SVG>
