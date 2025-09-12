<script lang="ts">
	import BaseIcon, { type IconProps } from '$lib/components/base/BaseIcon.svelte';
	import BaseLink, { type LinkProps } from '$lib/components/base/BaseLink.svelte';

	export type IconLinkProps = LinkProps & {
		icon: IconProps;
	};

	const { icon, ...link }: IconLinkProps = $props();
</script>

<BaseLink {...link}>
	<BaseIcon {...icon} />
</BaseLink>
