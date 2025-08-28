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

	const S = 220;
	const fontSizeDL = 150;
</script>

<SVG {uid} width={S} height={S} class={className}>
	<Rect width={S} height={S} fill={COLOR}/>
	<Logo x={S / 2} y={S / 2} fontSize={fontSizeDL} />
</SVG>
