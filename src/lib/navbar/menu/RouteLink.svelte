<script lang="ts">
	import { page } from '$app/state';
	import type { ButtonProps } from '$lib/components/base/BaseButton.svelte';
	import type { LinkProps } from '$lib/components/base/BaseLink.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import IconTextLink from '$lib/components/base/IconTextLink.svelte';
	import type { Route as RouteType } from '$lib/data/routes';
	import { cn } from '$lib/utils/cn';

	type Props = {
		route: RouteType;
		link?: LinkProps;
		button?: ButtonProps;
	};

	const { route, link, button }: Props = $props();

	// Common props for both link and button
	const commonProps = $derived({
		iconText: { text: { text: route.title }, icon: { icon: route.icon, class: 'size-5 opacity-50' } },
		class: cn('flex px-4 py-3 text-sm font-semibold hover:not-aria-[current]:text-current/80 aria-[current]:bg-current/20', link?.class ?? button?.class),
		'aria-current': page.data.route.id === route.id && !page.error ? 'page' : undefined
	});
</script>

{#if link}
	<IconTextLink {...link} {...commonProps} />
{:else if button}
	<IconTextButton {...button} {...commonProps} />
{/if}
