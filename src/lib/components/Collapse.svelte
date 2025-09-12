<script lang="ts">
	import { type IconTextProps } from '$lib/components/base/IconText.svelte';
	import IconTextButton from '$lib/components/base/IconTextButton.svelte';
	import { cn } from '$lib/utils/cn';
	import type { DefProps2 } from '$lib/utils/utils';
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = DefProps2 & {
		children?: Snippet;
		iconText: IconTextProps;
	};

	const { children, iconText, ...props }: Props = $props();
	const uid = $props.id();
</script>

<div class={cn('group/collapse', props.class)}>
	<IconTextButton
		iconText={{
			...iconText,
			icon: { icon: ChevronDown, class: cn('size-5 text-gray-400 in-aria-expanded:rotate-180', iconText.icon?.class) },
			text: { ...iconText.text, class: cn('not-in-aria-expanded:text-current in-aria-expanded:text-primary', iconText.text?.class) }
		}}
		class="group/label w-full"
		props={{ command: '--toggle', commandfor: `collapse-${uid}` }}
	/>

	<el-disclosure {...props.props} id={`collapse-${uid}`} class="contents">
		{@render children?.()}
	</el-disclosure>
</div>
