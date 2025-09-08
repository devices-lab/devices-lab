<script lang="ts">
	import type { DefProps } from '$lib/utils';
	import { CircleQuestionMarkIcon } from '@lucide/svelte';
	import IconText, { type IconTextProps } from '../components/icons/IconText.svelte';

	type Props = DefProps & {
		text?: IconTextProps['text'];
		tooltip?: string;
	};

	const { text, tooltip, ...props }: Props = $props();
</script>

<IconText {text} icon={{ icon: CircleQuestionMarkIcon, class: props.class, tooltip }} />
