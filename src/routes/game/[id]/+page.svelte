<script lang="ts">
	import { onMount } from 'svelte';
	import { Timer } from '$lib/components';
	import type { Game } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let game: Game;

	// we wait for the component to mount before we get the game from local storage
	// because svelte will try to run this code on the server where there is no local storage
	onMount(() => {
		game = getGameFromStorage(data.id);
	});

	/**
	 * gets the game from local storage with error handling
	 */
	function getGameFromStorage(id: string): Game {
		const unparsedGame = localStorage.getItem(id);
		if (!unparsedGame) throw new Error('No game found');

		const game: Game = JSON.parse(unparsedGame);
		if (!game) throw new Error('No game associated with this id');

		return game;
	}

	/**
	 * handles user input, checks for mistakes, and saves the game
	 */
	function handleChange(event: Event, rowIndex: number, cellIndex: number) {
		const target = event.target as HTMLInputElement;
		const value = target.value;

		game.currentBoard[rowIndex][cellIndex] = parseInt(value);

		game = game;

		// save game
		localStorage.setItem(game.id, JSON.stringify(game));
	}

	/**
	 * checks if the last move was a mistake
	 * returns true if it was a mistake
	 */
	function checkForMistake(row: number, col: number, value: number | null) {
		if (value === null) return false;
		// row
		for (let i = 0; i < 9; i++) {
			if (i !== col && game.currentBoard[row][i] === value) {
				return true;
			}
		}

		// col
		for (let i = 0; i < 9; i++) {
			if (i !== row && game.currentBoard[i][col] === value) {
				return true;
			}
		}

		// box
		const boxRow = Math.floor(row / 3);
		const boxCol = Math.floor(col / 3);

		for (let i = boxRow * 3; i < boxRow * 3 + 3; i++) {
			for (let j = boxCol * 3; j < boxCol * 3 + 3; j++) {
				if (i !== row && j !== col && game.currentBoard[i][j] === value) {
					return true;
				}
			}
		}
	}

	function isEditable(rowIndex: number, cellIndex: number) {
		return game.originalBoard[rowIndex][cellIndex] === null;
	}

	function clear() {
		game.currentBoard = [...game.originalBoard];
		game = game;
	}

	function submit() {
		// check if the game is solved
	}
</script>

{#if game}
	<div class="flex w-full flex-col items-center justify-center align-middle">
		<div class="flex w-1/3 flex-row justify-around">
			<!-- timer  -->
			{#if game.props.isTimer}
				<Timer />
			{/if}

			<!-- difficulty -->
			<div>
				<h1 class="font-bold">Difficulty</h1>
				<p>{game.props.difficulty.charAt(0).toUpperCase() + game.props.difficulty.slice(1)}</p>
			</div>
		</div>

		<!-- board  -->
		{#if game.props.size}
			<div class="m-10 w-fit">
				{#each game.currentBoard as row, rowIndex}
					<div class="text-2x flex text-center">
						{#each row as cell, cellIndex}
							<input
								type="number"
								class="w-12 border border-solid border-gray-200 p-3 text-center text-lg font-bold focus:bg-blue-200 dark:border-gray-500"
								class:cell-border-left={[3, 6].includes(cellIndex)}
								class:cell-border-top={[3, 6].includes(rowIndex)}
								class:bg-white={!checkForMistake(rowIndex, cellIndex, cell)}
								class:bg-red-200={checkForMistake(rowIndex, cellIndex, cell)}
								class:dark:bg-gray-700={!checkForMistake(rowIndex, cellIndex, cell)}
								class:dark:bg-red-500={checkForMistake(rowIndex, cellIndex, cell)}
								disabled={!isEditable(rowIndex, cellIndex)}
								value={cell}
								on:change={(event) => handleChange(event, rowIndex, cellIndex)}
							/>
						{/each}
					</div>
				{/each}
			</div>
		{/if}

		<!-- buttons  -->
		<div class="row">
			<button
				on:click={clear}
				class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white"
				>Clear</button
			>
			<button
				class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white"
				>Submit</button
			>
		</div>
		<div class="row">
			<p class="text-m" />
		</div>
	</div>
{/if}

<style>
	.cell-border-left {
		@apply border-l-2 border-solid border-l-black dark:border-l-white;
	}

	.cell-border-top {
		@apply border-t-2 border-solid border-t-black dark:border-t-white;
	}
</style>
