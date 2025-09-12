<script lang="ts">
	import BaseLink, { type LinkProps } from '$lib/components/base/BaseLink.svelte';
	import BaseText, { type TextProps } from '$lib/components/base/BaseText.svelte';

	export type IconLinkProps = LinkProps & {
		text: TextProps;
	};

	const { text, ...link }: IconLinkProps = $props();
</script>

<BaseLink {...link}>
	<BaseText {...text} />
</BaseLink>
