<script lang="ts">
	import { page } from '$app/state';
	import IconButton from '$lib/components/interactive/IconButton.svelte';
	import IconLink from '$lib/components/interactive/IconLink.svelte';
	import type { Route as RouteType } from '$lib/data/routes';
	import { cn } from '$lib/utils/cn';
	import type { DefProps } from '$lib/utils/utils';

	type Props = DefProps & {
		component: typeof IconButton | typeof IconLink;
		route: RouteType;
	};

	const { component, route, class: _class, ...props }: Props = $props();

	const current = $derived(page.data.route.id === route.id && !page.error ? { 'aria-current': 'page' } : undefined);
	const el = $derived({ component });
</script>

{#key current}
	<el.component {...props} {...current} text={route.title} link={route.id} icon={{ icon: route.icon, class: 'size-5 opacity-50' }} class={cn('flex font-semibold px-4 py-3 text-sm hover:not-aria-[current]:text-current/80 aria-[current]:bg-current/20', _class)} />
{/key}
