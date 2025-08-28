<script lang="ts">
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="container mx-auto px-6 py-12">
		<div class="flex flex-col justify-center gap-10 sm:flex-row">
			<div class="flex flex-1 flex-col items-center text-center">
				<span class="rounded-full bg-indigo-100/80 p-3 text-indigo-500 dark:bg-gray-800">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
					</svg>
				</span>

				<h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Email</h2>
				<p class="mt-2 text-gray-500 dark:text-gray-400">For any questions or ideas.</p>
				<p class="mt-4 text-indigo-500 dark:text-indigo-400">{data.contact.email}</p>
			</div>

			<div class="flex flex-1 flex-col items-center text-center">
				<span class="rounded-full bg-indigo-100/80 p-3 text-indigo-500 dark:bg-gray-800">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
					</svg>
				</span>

				<h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Office</h2>
				<p class="mt-2 text-gray-500 dark:text-gray-400">Come say hello at our devices lab.</p>
				<p class="mt-4 font-bold text-indigo-500 dark:text-indigo-400">{data.contact.address_0}</p>
				<p class="mt-2 text-indigo-500 dark:text-indigo-400">{data.contact.address_1}</p>
				<p class="mt-2 text-indigo-500 dark:text-indigo-400">{data.contact.address_2}</p>
				<p class="mt-2 text-indigo-500 dark:text-indigo-400">{data.contact.address_3}</p>
			</div>
		</div>
	</div>
</section>
