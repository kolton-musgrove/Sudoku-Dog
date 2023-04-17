<script lang="ts">
	import { onMount } from 'svelte';

	let timeElapsed: number = 0;
	let timerId: number;
	let isRunning: boolean = false;

	const startTimer = () => {
		if (!isRunning) {
			isRunning = true;
			timerId = setInterval(() => {
				timeElapsed += 1;
			}, 1000);
		}
	};

	const stopTimer = () => {
		clearInterval(timerId);
		isRunning = false;
	};

	const resetTimer = () => {
		stopTimer();
		timeElapsed = 0;
	};

	onMount(() => {
		startTimer();
	});
</script>

<div class="flex flex-col items-center">
	<h1 class="font-bold">Timer: {timeElapsed}s</h1>
	<div>
		<button
			on:click={startTimer}
			class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white"
			>Start</button
		>
		<button
			on:click={stopTimer}
			class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white"
			>Stop</button
		>
		<button
			on:click={resetTimer}
			class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white"
			>Reset</button
		>
	</div>
</div>
