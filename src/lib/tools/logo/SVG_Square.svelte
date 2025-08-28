<script lang="ts">
	import { STROKE, COLOR } from '$lib/tools/logo/utils';
	import SVG from '$lib/tools/logo/components/SVG.svelte';
	import Logo from '$lib/tools/logo/components/Logo.svelte';
	import Rect from '$lib/tools/logo/components/Rect.svelte';
	import type { ClassValue } from 'svelte/elements';

    interface Props {
        uid: string;
		class?: ClassValue;
    }

	const { uid, class: className = '' }: Props = $props();

	const W = 220;
	const H = 186;
	const fontSizeDL = 150;
</script>

<SVG {uid} width={W} height={H} class={className}>
	<Rect width={W} height={H} fill={COLOR}/>
	<Logo x={W / 2} y={H / 2} fontSize={fontSizeDL} />
</SVG>
