<script lang="ts">
	import { page } from '$app/state';
	import ItemPage from '$lib/items/page/ItemPage.svelte';
</script>

<ItemPage item={page.data.item} />

<!--
<ItemPage>
	<Collapse label={'Features'}>
		<List items={['LED displays for daylight readability', 'Up to 12 classification categories', 'Persistent data logging', 'Smart scanning of data collection sheets', 'Intelligent data upload for classes', 'Long life AA battery pack']} />
	</Collapse>
	<Collapse label={'Publications'}>
		<List bare class="space-y-5">
			<LinkItem label="Supporting Fieldwork for Primary Education" sublabel="ACM Paper" href="https://dl.acm.org/doi/10.1145/3585088.3593897">
				<Scroll />
			</LinkItem>
			<LinkItem label="Introducing Classroom Cloudlet" sublabel="ACM Paper" href="https://dl.acm.org/doi/10.1145/3585088.3594487">
				<Scroll />
			</LinkItem>
			<LinkItem label="Digital Economies Cloudlet Poster" sublabel="Poster" href="https://www.devices-lab.org/wp-content/uploads/2024/07/digitaleconomies_cloudletposter.pdf">
				<Scroll />
			</LinkItem>
		</List>
	</Collapse>
</ItemPage>
-->