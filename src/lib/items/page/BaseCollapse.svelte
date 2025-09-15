<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import Collapse from '$lib/components/Collapse.svelte';
	import type { ClassProp } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = ClassProp & {
		label: string;
		children: Snippet;
	};

	const { label, children, ...props }: Props = $props();

	const generateCollapse = (label: string) => {
		return {
			iconText: { text: { text: label, class: 'font-semibold' }, class: 'justify-between', icon: { class: 'size-7' } },
			props: { open: true }
		};
	};
</script>

<ClassBox {props}>
	<Collapse {...generateCollapse(label)}>
		<div class="my-5 flex flex-col gap-y-5">
			{@render children()}
		</div>
	</Collapse>
</ClassBox>
