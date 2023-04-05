<script lang="ts">
	import { onMount } from 'svelte';
	import { Timer } from '$lib/components';
	import type { Game } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let correctBoard: Game['correctBoard'];
	let currentBoard: Game['currentBoard'];
	let timer: Game['props']['timer'];
	let difficulty: Game['props']['difficulty'];
	let size: Game['props']['size'];

	// the following code in in onMount to force it to run on the client only.
	onMount(() => {
		if (data.id) {
			// attempt to load game from storage
			const game = getGameFromStorage(data.id);

			// if game is found, load it
			loadGame(game);
		} else {
			// handle error or redirect
			throw new Error('Game not found');
		}
	});

	function getGameFromStorage(id: string): Game {
		const unparsedGame = localStorage.getItem(id);

		if (!unparsedGame) throw new Error('No game found');

		const game: Game = JSON.parse(unparsedGame);

		if (!game) throw new Error('No game associated with this id');

		return game;
	}

	function loadGame(game: Game) {
		correctBoard = game.correctBoard;
		currentBoard = game.currentBoard;
		timer = game.props.timer;
		difficulty = game.props.difficulty;
		size = game.props.size;

		console.log(game);
	}

	function handleInput(event: Event, rowIndex: number, cellIndex: number) {
		const target = event.target as HTMLInputElement;
		const value = target.value;

		if (value.length > 1) {
			target.value = value.slice(0, 1);
		}

		currentBoard[rowIndex][cellIndex] = parseInt(value);
		currentBoard = currentBoard;
	}
</script>

<div class="container-fluid flex">
	<!-- timer  -->
	{#if timer}
		<h1>Timer</h1>
		<Timer />
	{/if}

	<!-- difficulty -->
	{#if difficulty}
		<div>
			<h1>Difficulty</h1>
			<p>{difficulty.toUpperCase()}</p>
		</div>
	{/if}

	<!-- board  -->
	{#if size}
		<div class="row">
			<h1>Board</h1>
			<div class="mx-4 w-fit">
				{#each currentBoard as row, rowIndex}
					<div
						class="text-center flex text-2xl {[3, 6].includes(rowIndex)
							? 'border-t-2 border-solid border-black'
							: ''}"
					>
						{#each row as cell, cellIndex}
							<div
								class="text-center border p-4 {[3, 6].includes(cellIndex)
									? 'border-l-2 border-t-gray-200 border-r-gray-200 border-b-gray-200 border-solid border-black'
									: ''}"
							>
								<input
									type="number"
									class="w-5 h-5 text-center text-md font-bold"
									maxlength="1"
									value={cell !== 0 ? cell : ''}
									on:change={(event) => handleInput(event, rowIndex, cellIndex)}
								/>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- buttons  -->
	<div class="row">
		<button class="btn btn-primary" id="clear">Clear</button>
		<button class="btn btn-primary" id="submit">Submit</button>
	</div>
	<div class="row">
		<p class="text-m" />
	</div>
</div>
