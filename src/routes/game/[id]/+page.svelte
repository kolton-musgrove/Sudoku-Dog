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
	function checkForMistake(row: number, col: number, value: number) {
		if (value === 0) return false;
		// row
		for (let i = 0; i < 9; i++) {
			if (i !== col && game['currentBoard'][row][i] === value) {
				return true;
			}
		}

		// col
		for (let i = 0; i < 9; i++) {
			if (i !== row && game['currentBoard'][i][col] === value) {
				return true;
			}
		}

		// box
		const boxRow = Math.floor(row / 3);
		const boxCol = Math.floor(col / 3);

		for (let i = boxRow * 3; i < boxRow * 3 + 3; i++) {
			for (let j = boxCol * 3; j < boxCol * 3 + 3; j++) {
				if (i !== row && j !== col && game['currentBoard'][i][j] === value) {
					return true;
				}
			}
		}
	}

	function isEditable(rowIndex: number, cellIndex: number) {
		return game.originalBoard[rowIndex][cellIndex] === 0;
	}

	function handleInput(event: Event) {
		const element = event.currentTarget as HTMLInputElement;
		const value = element.value;

		if (value.length > 1) {
			element.value = value.slice(0, 1);
		}
	}
</script>

{#if game}
	<div class="container-fluid flex">
		<!-- timer  -->
		{#if game.props.isTimer}
			<h1>Timer</h1>
			<Timer />
		{/if}

		<!-- difficulty -->
		<div>
			<h1>Difficulty</h1>
			<p>{game.props.difficulty}</p>
		</div>

		<!-- board  -->
		{#if game.props.size}
			<div class="row">
				<h1>Board</h1>
				<div class="mx-4 w-fit">
					{#each game.currentBoard as row, rowIndex}
						<div class="text-2x flex text-center">
							{#each row as cell, cellIndex}
								<input
									type="number"
									class="w/ border bg-white p-3 text-center text-lg font-bold focus:bg-blue-200"
									class:cell-border-right={[3, 6].includes(cellIndex)}
									class:cell-border-top={[3, 6].includes(rowIndex)}
									class:text-black={isEditable(rowIndex, cellIndex)}
									class:bg-red-200={checkForMistake(rowIndex, cellIndex, cell)}
									disabled={!isEditable(rowIndex, cellIndex)}
									maxlength="1"
									value={cell !== 0 ? cell : ''}
									on:change={(event) => handleChange(event, rowIndex, cellIndex)}
								/>
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
{/if}

<style>
	.cell-border-right {
		@apply border-l-2 border-solid border-black border-b-gray-200 border-r-gray-200 border-t-gray-200;
	}

	.cell-border-top {
		@apply border-t-2 border-solid border-black;
	}
</style>
