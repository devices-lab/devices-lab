<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { resolveLink, type Href, type Link } from '$lib/data/routes';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type LinkType = Link | Href;

	export type LinkProps = DefProps & {
		link: LinkType;
	};

	type Props = LinkProps & {
		children?: Snippet;
	};

	const { children, link, ...props }: Props = $props();

	const resolved: Link = $derived(resolveLink(link));
	const linkProps = $derived({
		target: resolved.external ? '_blank' : undefined,
		rel: resolved.external ? 'noopener noreferrer' : undefined
	});
</script>

<ClassBox {props} tag="a" href={resolved.href} class="cursor-pointer" {...linkProps}>
	{@render children?.()}
</ClassBox>
