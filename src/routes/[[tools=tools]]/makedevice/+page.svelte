<script lang="ts">
	import ItemPage from '$lib/items/page/Page.svelte';
	import List from '$lib/items/page/List.svelte';
	import Collapse from '$lib/items/page/Collapse.svelte';
	import LinkItem from '$lib/items/page/LinkItem.svelte';
	import { Scroll } from '@lucide/svelte';
</script>

<ItemPage>
	<Collapse label={'Features'}>
		<List items={['Jacdac modules attached to the PC are automatically detected, arranged on a carrier PCB and electrically routed', 'Intuitive drag and drop interface lets users (re)arrange modules', 'Automatic generation of Gerber files from the final arrangement, suitable for online PCB fabrication services without modification.', 'Various enclosure options are presented to the user, MakeDevice automatically generates STL files for 3D printing and SVGs for laser cut press fit boxes or stencils ']} />
	</Collapse>
	<Collapse label={'Publications'}>
		<List bare class="space-y-5">
			<LinkItem label="MakeDevice: Evolving Devices Beyond the Prototype with Jacdac" sublabel="ACM Paper" href="https://dl.acm.org/doi/abs/10.1145/3569009.3573106">
				<Scroll />
			</LinkItem>
		</List>
	</Collapse>
</ItemPage>
