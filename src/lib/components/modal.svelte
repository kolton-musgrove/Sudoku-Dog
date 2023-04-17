<script lang="ts">
	export let showModal: boolean;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			dialog.close();
		}
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	on:keypress={handleKeyPress}
	class="w-3/4 rounded-lg"
>
	<div on:click|stopPropagation on:keypress|stopPropagation class="flex flex-col items-center">
		<slot />
		<button
			on:click={() => dialog.close()}
			on:keypress={handleKeyPress}
			class="mt-5 w-fit rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:bg-gray-100 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-50"
			>Close Modal</button
		>
	</div>
</dialog>
