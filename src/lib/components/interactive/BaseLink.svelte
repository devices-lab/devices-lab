<script lang="ts">
	import type { RouteId } from '$app/types';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { resolveHref, type ParamRoutes } from '$lib/data/routes';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type LinkType = string | RouteId;

	export type LinkProps = {
		link?: LinkType;
		slug?: string;
		type?: ParamRoutes;
		external?: boolean;
	};

	type Props = DefProps &
		LinkProps & {
			children?: Snippet;
		};

	const { children, href, link, slug, type, external, ...props }: Props = $props();

	const resolved = $derived(resolveHref(link, slug, type, external));

	const linkProps = $derived({
		target: resolved.external ? '_blank' : undefined,
		rel: resolved.external ? 'noopener noreferrer' : undefined
	});
</script>

<ClassBox {props} tag="a" href={resolved.href} {...linkProps}>
	{@render children?.()}
</ClassBox>
