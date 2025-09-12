<script lang="ts">
	import ClassBox from '$lib/components/ClassBox.svelte';
	import type { TextProps } from '$lib/components/base/BaseText.svelte';
	import OpenButton from '$lib/components/interactive/OpenButton.svelte';
	import type { DefProps } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = DefProps & {
		children: Snippet;
		label: TextProps;
	};

	const { children, label, ...props }: Props = $props();

	const uid = $props.id();
	const disclosureId = $derived(`disclosure-${uid}`);
</script>

<ClassBox {props} class="px-4 py-6">
	<OpenButton text={label} props={{ command: '--toggle', commandfor: disclosureId }} />
	<el-disclosure id={disclosureId} hidden class="block pt-6">
		{@render children()}
	</el-disclosure>
</ClassBox>
