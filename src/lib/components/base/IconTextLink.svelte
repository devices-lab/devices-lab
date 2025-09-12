<script lang="ts">
	import BaseLink, { type LinkProps } from '$lib/components/base/BaseLink.svelte';
	import IconText, { type IconTextProps } from '$lib/components/base/IconText.svelte';

	export type IconTextLinkProps = LinkProps & {
		iconText: IconTextProps;
	};

	const { iconText, ...link }: IconTextLinkProps = $props();
</script>

<BaseLink {...link}>
	<IconText {...iconText} />
</BaseLink>
