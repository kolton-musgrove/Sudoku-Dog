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

<div>
	<h1>Timer: {timeElapsed}s</h1>
	<button on:click={startTimer}>Start</button>
	<button on:click={stopTimer}>Stop</button>
	<button on:click={resetTimer}>Reset</button>
</div>
