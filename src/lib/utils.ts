import { writable } from 'svelte/store';


export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}



export const devMode = writable(false);