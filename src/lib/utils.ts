import { writable } from 'svelte/store';


export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}



export const devMode = writable(false);


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