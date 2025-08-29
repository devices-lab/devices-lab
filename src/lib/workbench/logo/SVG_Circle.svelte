<script lang="ts">
	import { COLOR } from '$lib/workbench/logo/utils';
	import SVG from '$lib/workbench/logo/components/SVG.svelte';
	import Logo from '$lib/workbench/logo/components/Logo.svelte';
	import Circle from '$lib/workbench/logo/components/Circle.svelte';
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
	<Circle diameter={S} fill={COLOR} />
	<Logo x={S / 2} y={S / 2} fontSize={fontSizeDL} />
</SVG>
