<script lang="ts">
	import BaseCard from '$lib/components/BaseCard.svelte';
	import { Mail, MapPin } from '@lucide/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<BaseCard class="flex flex-col justify-center gap-10 px-6! py-12! sm:flex-row">
	<div class="flex flex-1 flex-col items-center text-center">
		<Mail class="size-10 text-primary-500" />
		<h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Email</h2>
		<p class="mt-2 text-gray-500 dark:text-gray-400">For any questions or ideas.</p>
		<p class="mt-4 text-primary-500 dark:text-primary-400">{data.contact.email}</p>
	</div>

	<div class="flex flex-1 flex-col items-center text-center">
		<MapPin class="size-10 text-primary-500" />
		<h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Office</h2>
		<p class="mt-2 text-gray-500 dark:text-gray-400">Come talk to us about devices.</p>
		<p class="mt-4 font-bold text-gray-800 dark:text-gray-400">{data.contact.address_0}</p>
		<p class="mt-2 text-gray-800 dark:text-gray-400">{data.contact.address_1}</p>
		<p class="mt-2 text-gray-800 dark:text-gray-400">{data.contact.address_2}</p>
		<p class="mt-2 text-gray-800 dark:text-gray-400">{data.contact.address_3}</p>
	</div>
</BaseCard>
