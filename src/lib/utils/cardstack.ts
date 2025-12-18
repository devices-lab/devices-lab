// cardStack.ts
type StackDensity = 'tight' | 'normal' | 'loose';
type StackStyle = 'paper' | 'flat';

export type CardStackOptions = {
	depth?: 1 | 2 | 3 | 4;
	density?: StackDensity;
	radiusClass?: string;
	style?: StackStyle;
	hoverSpread?: boolean;

	offsetPx?: { tight: number; normal: number; loose: number };
	scaleStep?: { tight: number; normal: number; loose: number };
	rotStepDeg?: { tight: number; normal: number; loose: number };
};

type Layer = { class: string; style: string };

//const DEFAULTS = {
//	offsetPx: { tight: 6, normal: 9, loose: 12 },
//	scaleStep: { tight: 0.01, normal: 0.015, loose: 0.02 },
//	rotStepDeg: { tight: 0.5, normal: 0.8, loose: 1.1 }
//} as const;

const DEFAULTS = {
	offsetPx: { tight: 6, normal: 4, loose: 12 },
	scaleStep: { tight: 0.01, normal: 0.02, loose: 0.02 },
	rotStepDeg: { tight: 0.5, normal: 2.8, loose: 1.1 }
} as const;

function clampDepth(d: number): 1 | 2 | 3 | 4 {
	if (d <= 1) return 1;
	if (d === 2) return 2;
	if (d === 3) return 3;
	return 4;
}

function bgFor(i: number, style: StackStyle) {
	if (style === 'paper') {
		return ['bg-slate-50/90 dark:bg-gray-900/35', 'bg-slate-100/80 dark:bg-gray-900/25', 'bg-slate-200/50 dark:bg-gray-900/18', 'bg-slate-300/35 dark:bg-gray-900/12'][i - 1] ?? 'bg-slate-200/40 dark:bg-gray-900/15';
	}
	return ['bg-black/[0.03] dark:bg-white/[0.05]', 'bg-black/[0.025] dark:bg-white/[0.04]', 'bg-black/[0.02] dark:bg-white/[0.03]', 'bg-black/[0.015] dark:bg-white/[0.025]'][i - 1] ?? 'bg-black/[0.02] dark:bg-white/[0.03]';
}

export function cardStackLayers(opts: CardStackOptions = {}): readonly Layer[] {
	const depth = clampDepth(opts.depth ?? 3);
	const density = opts.density ?? 'normal';
	const radius = opts.radiusClass ?? 'rounded-3xl';
	const style = opts.style ?? 'paper';
	const hoverSpread = opts.hoverSpread ?? false;

	const offsetPx = opts.offsetPx ?? DEFAULTS.offsetPx;
	const scaleStep = opts.scaleStep ?? DEFAULTS.scaleStep;
	const rotStepDeg = opts.rotStepDeg ?? DEFAULTS.rotStepDeg;

	const step = offsetPx[density];
	const sStep = scaleStep[density];
	const rStep = rotStepDeg[density];

	// Tailwind-safe: all arbitrary values are STATIC, fed by CSS variables.
	const common = [
		'absolute inset-0',
		radius,
		'ring-2 ring-black/10 dark:ring-white/10',
		'transition-transform duration-200 ease-out will-change-transform',
		// base transform (uses the “rest” vars)
		'translate-x-[var(--stack-off-rest)] translate-y-[var(--stack-off-rest)]',
		'rotate-[var(--stack-rot-rest)]',
		'scale-[var(--stack-scale)]',
		// hover transform (uses the “hover” vars) — only meaningful if hoverSpread=true
		'group-hover:translate-x-[var(--stack-off-hover)] group-hover:translate-y-[var(--stack-off-hover)]',
		'group-hover:rotate-[var(--stack-rot-hover)]'
	].join(' ');

	const out: Layer[] = [];

	for (let i = 1; i <= depth; i++) {
		const off = step * i;

		const scale = 1 - sStep * i;
		const sign = i % 2 === 0 ? -1 : 1;
		const rot = sign * rStep * (1 - (i - 1) * 0.12);

		const z = `-z-${i * 10}`;
		const shadow = style === 'paper' && i <= 2 ? 'shadow-sm' : '';
		const bg = bgFor(i, style);

		// If hoverSpread: rest=0, hover=computed
		// Else: rest=computed, hover=computed (so it looks the same on hover)
		const restOff = hoverSpread ? 0 : off;
		const restRot = hoverSpread ? 0 : rot;

		const styleVars = `--stack-scale:${scale};` + `--stack-off-rest:${restOff}px; --stack-rot-rest:${restRot}deg;` + `--stack-off-hover:${off}px; --stack-rot-hover:${rot}deg;`;

		out.push({
			class: `${common} ${z} ${bg} ${shadow}`,
			style: styleVars
		});
	}

	return out;
}
