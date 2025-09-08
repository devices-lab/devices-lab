<script lang="ts">
	import { resolve } from '$app/paths';
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	export type BaseLinkProps = {
		href: string;
		external?: boolean;
	};

	type Props = DefProps &
		BaseLinkProps & {
			children: Snippet;
		};

	const { children, href, external = false, ...props }: Props = $props();



	const externalLink = $derived(external || href.startsWith('http'));
	const resolvedHref = $derived(href.startsWith('/') ? resolve(href) : href);
	const linkProps = $derived({
		target: externalLink ? '_blank' : undefined,
		rel: externalLink ? 'noopener noreferrer' : undefined
	});
</script>

<ClassBox {props} tag="a" href={resolvedHref} {...linkProps}>
	{@render children?.()}
</ClassBox>
