
import { writable } from 'svelte/store';
import * as icons from '@lucide/svelte';
import type { ClassValue } from 'svelte/elements';


// Get an icon by name
export function getIcon(name: string): typeof icons.Icon | undefined {
	return (icons as never)[name];
}


export const generateHash = (data: string) => {
	let hash = 0;
	for (const char of data) {
		hash = (hash << 5) - hash + char.charCodeAt(0);
		hash |= 0; // Constrain to 32bit integer
	}
	return hash;
};

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}



export const devMode = writable(false);
export const devModeLocal = writable(false);
export const overrideDevMode = writable(true);

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

export const clamp = (v: number, lo = -Infinity, hi = Infinity): number => Math.min(hi, Math.max(lo, v));

export const isBound = (v: number, lo: number, hi: number): boolean => v >= lo && v <= hi;


export function assert<T>(condition: T | undefined | null, message?: string): T {
	if (!condition) {
		throw new Error(message || "Assertion failed");
	}
	return condition;
}

// Make a string important by adding '!' to the end of each word
export const makeImportant = (s: string): string => s.replace(/\S+/g, c => c.endsWith('!') ? c : c + '!');



export type DefProps = {
	class?: ClassValue; //import('clsx').ClassValue;
	[key: string]: unknown;
}

// Utility: Build prefixed keys (iconText → iconText, iconClass → iconClass, etc.)
export type Prefixed<T, P extends string> = {
	[K in keyof T as `${P}${Capitalize<string & K>}`]?: T[K];
};

// Strip a prefix and decapitalize the next letter: iconText -> text, iconIconProps -> iconProps
export function unprefix<T extends object>(src: Record<string, unknown>, prefix: string): Partial<T> {
	const out: Record<string, unknown> = {};
	const n = prefix.length;
	for (const k in src) {
		if (k.startsWith(prefix) && k.length > n) {
			const bare = k.slice(n);
			const decap = bare[0].toLowerCase() + bare.slice(1);
			out[decap] = src[k];
		}
	}
	return out as Partial<T>;
}

// Normalize a value by wrapping it in an object with a specific key
export function normalize<TValue extends object, TUnion extends TValue | string | undefined>(v: TUnion, key: string): TValue | undefined {
	if (v == null) return undefined;
	if (typeof v === 'object') return v as TValue;
	return { [key]: v } as TValue;
}


/**
 * Remove a leading character from a string.
 *
 * @param input - The source string.
 * @param charToRemove - The single character to remove if it appears at the start.
 * @param options.repeat - If true, remove all consecutive leading occurrences. Default: false.
 * @param options.ignoreCase - If true, match the leading character case-insensitively. Default: false.
 *
 * @example
 * removeLeadingChar("/api", "/");                  // "api"
 * removeLeadingChar("///path", "/", { repeat: true }); // "path"
 * removeLeadingChar("AAAfoo", "a", { ignoreCase: true, repeat: true }); // "foo"
 */
export function removeLeadingChar(input: string, charToRemove: string, options: { repeat?: boolean; ignoreCase?: boolean } = {}): string {
	const { repeat = false, ignoreCase = false } = options;

	if (charToRemove.length !== 1) {
		throw new Error("charToRemove must be exactly one character.");
	}

	// Escape regex metacharacters
	const escaped = charToRemove.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const flags = ignoreCase ? "i" : "";
	const pattern = new RegExp(`^${escaped}${repeat ? "+" : ""}`, flags);

	return input.replace(pattern, "");
}

/**
 * Concatenate two strings with a separator.
 * If exactly one value is `undefined`, return the other.
 * If both are `undefined`, return `undefined`.
 *
 * Empty strings ("") are treated as real values and participate in concatenation.
 *
 * @example
 * concatWithSeparator("foo", "bar", "/");   // "foo/bar"
 * concatWithSeparator(undefined, "bar", "/"); // "bar"
 * concatWithSeparator("foo", undefined, "/"); // "foo"
 * concatWithSeparator(undefined, undefined, "/"); // undefined
 * concatWithSeparator("", "bar", "/"); // "/bar"
 */
export function concat(a: string, b: string, separator?: string): string;
export function concat(a: string | undefined, b: string | undefined, separator?: string): string;
export function concat(a: string | undefined, b: string | undefined, separator = ""): string {
	if (!a && !b) return '';
	if (!a) return b as string;
	if (!b) return a;
	return a + separator + b;
}