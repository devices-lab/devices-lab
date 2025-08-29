<script lang="ts">
	import ItemPage from '$lib/items/page/Page.svelte';
	import Collapse from '$lib/items/page/Collapse.svelte';
	import LinkItem from '$lib/items/page/LinkItem.svelte';
	import List from '$lib/items/page/List.svelte';

	import { Github, CodeXml } from '@lucide/svelte';
</script>

<ItemPage>
	<Collapse label={'Features'}>
		<List items={['Edge connector for BBC micro:bit', 'Four directional DPAD buttons', 'Two shoulder buttons', 'Two selector buttons', 'Five addressable RGB LEDs', 'Convenient AAA backpack']} />
	</Collapse>
	<Collapse label={'Resources'}>
		<List bare class="space-y-5">
			<LinkItem label="GitHub" href="https://github.com/devices-lab/solderbit-gamepad">
				<Github />
			</LinkItem>
			<LinkItem label="MakeCode Extension" href="https://github.com/devices-lab/pxt-solderbit-gamepad">
				<CodeXml />
			</LinkItem>
		</List>
	</Collapse>
</ItemPage>
