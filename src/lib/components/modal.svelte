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
	class="w-3/4 rounded-lg text-gray-200 shadow-lg dark:bg-gray-700"
>
	<div
		on:click|stopPropagation
		on:keypress|stopPropagation
		class="mb-10 flex flex-col items-center"
	>
		<button
			on:click={() => dialog.close()}
			on:keypress={handleKeyPress}
			class="w-fit self-end rounded-lg bg-white px-4 py-2 dark:bg-gray-700 dark:hover:bg-gray-400"
			>X</button
		>
		<slot />
	</div>
</dialog>
