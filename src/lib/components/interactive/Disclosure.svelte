<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { TextProps, TextType } from '$lib/components/icons/TextItem.svelte';
	import IconButton from '$lib/components/interactive/IconButton.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import { ChevronDown } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import OpenButton from '$lib/components/interactive/OpenButton.svelte';

	type Props = DefProps & {
		children: Snippet;
		label: TextType | TextProps;
	};

	const { children, label, ...props }: Props = $props();

	const uid = $props.id();
	const disclosureId = $derived(`disclosure-${uid}`);
</script>

<ClassBox {props} class="px-4 py-6">
	<OpenButton command="--toggle" commandfor={disclosureId} text={label} />
	<el-disclosure id={disclosureId} hidden class="block pt-6">
		{@render children()}
	</el-disclosure>
</ClassBox>
