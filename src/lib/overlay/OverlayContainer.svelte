<script lang="ts">
	import OverlayLink from '$lib/overlay/OverlayLink.svelte';
	import OverlayEgg from '$lib/overlay/OverlayEgg.svelte';

	import { devMode } from '$lib/utils/utils';

	export interface OverlayType {
		renderedW: number;
		renderedH: number;
		offsetX: number;
		offsetY: number;
	}

	const { imgWidth, imgHeight }: { imgWidth: number; imgHeight: number } = $props();

	let cw = $state(0);
	let ch = $state(0);

	// Resize action with rAF throttle
	function resize(node: HTMLElement) {
		let frame = 0;

		const ro = new ResizeObserver(() => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				const r = node.getBoundingClientRect();
				cw = r.width;
				ch = r.height;
			});
		});
		ro.observe(node);
		// initialize once
		const r0 = node.getBoundingClientRect();
		cw = r0.width;
		ch = r0.height;

		return {
			destroy() {
				ro.disconnect();
				if (frame) cancelAnimationFrame(frame);
			}
		};
	}

	// Derived layout math
	const scale = $derived(Math.max(cw / imgWidth || 0, ch / imgHeight || 0));
	const renderedW = $derived(imgWidth * scale || 0);
	const renderedH = $derived(imgHeight * scale || 0);
	const offsetX = $derived((cw - renderedW) / 2 || 0);
	const offsetY = $derived((ch - renderedH) / 2 || 0);

	// Hide button until sizes are known
	const ready = $derived(Boolean(cw && ch && imgWidth && imgHeight));
</script>

<div class="absolute inset-0 z-10 size-full overflow-hidden" use:resize>
	{#if ready}
		<!--<OverlayLink href="/test" label="test" x={0.3} y={0.5} overlay={{ renderedW, renderedH, offsetX, offsetY }} class=""/>-->
		<OverlayEgg action={() => { devMode.set(!$devMode) }} x={0.588} y={0.765} overlay={{ renderedW, renderedH, offsetX, offsetY }}/>
	{/if}
</div>
