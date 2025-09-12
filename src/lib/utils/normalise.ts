// Narrowing guard for plain objects (not null)
export function isObject<T extends object>(v: unknown): v is T {
	return typeof v === 'object' && v !== null;
}

/**
 * Normalise a value that can be either a full object T or just the value of one of its keys T[K],
 * returning a full object T. This variant allows `undefined` and returns `undefined` in that case.
 *
 * Example:
 *   normaliseOptional<TextProps, 'text'>(value, 'text') // value: string | TextProps | undefined
 */
export function normaliseOptional<T extends Record<string, unknown>, K extends keyof T>(v: T | T[K] | undefined, key: K): T | undefined {
	if (v === undefined) return undefined;
	return isObject<T>(v) ? v : ({ [key]: v } as T);
}

/**
 * Normalise a value that can be either a full object T or just the value of one of its keys T[K],
 * always returning a full object T. Use when the prop is required.
 *
 * Example:
 *   normaliseRequired<IconProps, 'icon'>(value, 'icon') // value: IconProps | IconProps['icon']
 */
export function normaliseRequired<T extends Record<string, unknown>, K extends keyof T>(v: T | T[K], key: K): T {
	return isObject<T>(v) ? v : ({ [key]: v } as T);
}
