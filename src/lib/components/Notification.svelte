<script lang="ts">
	import { CircleAlert, CircleCheckBig, CircleX, Icon, X } from '@lucide/svelte';
	import CloseButton from './interactive/CloseButton.svelte';
	import IconButton from './base/IconButton.svelte';

	const NOTIFICATION_TIMEOUT_MS = 3000;

	type NotificationType = 'success' | 'error' | 'info';

	type NotificationContent = {
		active: boolean;
		type: NotificationType;
		title: string;
		message: string;
	};

	type NotificationStyle = {
		icon: typeof Icon;
		color: string;
	};

	//======================================================================================//

	let content: NotificationContent = $state({
		active: false,
		type: 'info',
		title: '',
		message: ''
	});

	const style: NotificationStyle = $derived.by(() => {
		switch (content.type) {
			case 'success':
				return { icon: CircleCheckBig, color: 'text-green-400' };
			case 'error':
				return { icon: CircleX, color: 'text-red-400' };
			case 'info':
				return { icon: CircleAlert, color: 'text-blue-400' };
		}
	});

	//======================================================================================//

	let timer: NodeJS.Timeout;

	export const show = (type: NotificationType, title: string, message: string = '', timeout: number = NOTIFICATION_TIMEOUT_MS) => {
		content = { active: true, type, title, message };

		clearTimeout(timer);
		timer = setTimeout(() => {
			hide();
		}, timeout);
	};

	export const hide = () => {
		content = { active: false, type: 'info', title: '', message: '' };
	};

	//======================================================================================//
</script>

<div aria-live="assertive" class="pointer-events-none fixed inset-0 z-100 flex items-end px-4 py-6 sm:items-start sm:p-6">
	<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
		{#if content.active}
			<div class="pointer-events-auto w-full max-w-sm translate-y-0 transform rounded-lg bg-white opacity-100 shadow-lg outline-1 outline-black/5 transition duration-300 ease-out sm:translate-x-0 dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10 starting:translate-y-2 starting:opacity-0 starting:sm:translate-x-2 starting:sm:translate-y-0">
				<div class="p-4">
					<div class="flex items-start">
						<div class="shrink-0">
							<style.icon class={`size-6 ${style.color}`} />
						</div>
						<div class="ml-3 w-0 flex-1 pt-0.5">
							<p class="text-sm font-medium text-gray-900 dark:text-white">{content.title}</p>
							<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{content.message}</p>
						</div>
						<div class="ml-4 flex shrink-0">
							<IconButton onclick={() => (content.active = false)} icon={{ icon: X, class: 'size-5' }} class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-primary-500 dark:hover:text-white dark:focus:outline-primary-500" />
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
