<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import BaseButton from '$lib/components/base/BaseButton.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		label: string;
	};

	const { children, label, ...props }: Props = $props();
	const uid = $props.id();
</script>

<ClassBox {props}>
	<BaseButton class="group/collapse flex link-sky items-center" props={{ command: '--toggle', commandfor: `collapse-${uid}` }}>
		<span class="text-xs font-semibold not-in-aria-expanded:text-gray-700 in-aria-expanded:text-primary-600 dark:not-in-aria-expanded:text-gray-300 dark:in-aria-expanded:text-primary-400">{label}</span>
		<span class="ml-1 flex cursor-pointer items-center">
			<ChevronDown class="size-5 text-gray-400 group-hover/collapse:text-gray-500 in-aria-expanded:group-hover/collapse:text-primary-800 in-aria-expanded:rotate-180" />
		</span>
	</BaseButton>

	<el-disclosure hidden id={`collapse-${uid}`} class="contents">
		{@render children()}
	</el-disclosure>
</ClassBox>
