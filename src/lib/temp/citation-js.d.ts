// Minimal typings just for what you use. Expand if needed.
declare module '@citation-js/core' {
	export interface CiteInstance {
		format(
			type: 'bibliography' | 'bibtex' | 'json' | string,
			options?: Record<string, unknown>
		): string;
		// add other methods you use, e.g. get(): unknown[];
	}

	export const Cite: {
		new(data?: unknown, options?: unknown): CiteInstance;
		async(data: unknown, options?: unknown): Promise<CiteInstance>;
	};
}

// These register side-effects; no exports needed.
declare module '@citation-js/plugin-doi';
declare module '@citation-js/plugin-csl';
