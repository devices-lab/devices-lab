// src/lib/utils/cn.ts
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Combine arbitrary class values and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/** Merge multiple objects into one. Later objects override properties of earlier ones. */
export function co(...inputs: (Record<string, unknown> | undefined)[]): Record<string, unknown> {
	return Object.assign({}, ...inputs);
}

/** Returns the last non-null/undefined item from the inputs. */
export function nn<T>(...inputs: (T | undefined | null)[]): T | undefined {
	for (const input of inputs.reverse()) {
		if (input !== null && input !== undefined) return input;
	}
	return undefined;
}

export type { ClassValue };

export type cnType = (...inputs: ClassValue[]) => string;