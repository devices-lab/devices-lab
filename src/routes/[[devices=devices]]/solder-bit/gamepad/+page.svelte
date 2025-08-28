<script lang="ts">
	import { item } from './about';

	import Panel from '$lib/items/panel/Panel.svelte';
	import Collapse from '$lib/items/panel/Collapse.svelte';
	import LinkItem from '$lib/items/panel/LinkItem.svelte';
	import List from '$lib/items/panel/List.svelte';

	import { Github, CodeXml } from '@lucide/svelte';
</script>

<Panel logo={item.logo} name={item.name} description={item.description} images={item.images}>
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
</Panel>
