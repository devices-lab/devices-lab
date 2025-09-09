<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import { resolveLink, type Href, type Link } from '$lib/data/routes';
	import { normaliseOptional, normaliseRequired } from '$lib/utils/normalise';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children?: Snippet;
		link: Link | Href;
	};

	const { children, link, ...props }: Props = $props();

	const resolved: Link = $derived(resolveLink(link));
	const linkProps = $derived({
		target: resolved.external ? '_blank' : undefined,
		rel: resolved.external ? 'noopener noreferrer' : undefined
	});
</script>

<ClassBox {props} tag="a" href={resolved.href} {...linkProps}>
	{@render children?.()}
</ClassBox>
