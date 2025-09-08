// src/lib/utils/cn.ts
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Combine arbitrary class values and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export type { ClassValue };

export type cnType = (...inputs: ClassValue[]) => string;