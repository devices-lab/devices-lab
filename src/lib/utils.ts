import { writable } from 'svelte/store';


export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}



export const devMode = writable(false);
export const devModeLocal = writable(false);

devMode.subscribe(() => {
	devModeLocal.set(false);
});

export function hexToRgbA(hex: string, alpha: number) {
	let c: string[];
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		const x = parseInt('0x' + c.join(''));
		return 'rgba(' + [(x >> 16) & 255, (x >> 8) & 255, x & 255].join(',') + ',' + alpha.toString() + ')';
	}
	return '#ffffff';
}


export function pick<T extends object, K extends readonly (keyof T)[]>(obj: T, keys: K): Partial<Pick<T, K[number]>> {
	const out = {} as Partial<Pick<T, K[number]>>;
	for (const k of keys) {
		const v = obj[k];
		if (v !== undefined && v !== null)
			out[k] = v;
	}
	return out;
}

export const clamp = (v: number, lo = -Infinity, hi = Infinity) => Math.min(hi, Math.max(lo, v));


export function assert<T>(condition: T | undefined | null, message?: string): T {
	if (!condition) {
		throw new Error(message || "Assertion failed");
	}
	return condition;
}

// Make a string important by adding '!' to the end of each word
export const makeImportant = (s: string): string => s.replace(/\S+/g, c => c.endsWith('!') ? c : c + '!');
