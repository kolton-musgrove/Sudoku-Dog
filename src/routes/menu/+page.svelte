<script lang="ts">
	import { goto } from '$app/navigation';
	import { createSolution, createStartingGrid } from '$lib/utility';
	import type { Game } from '$lib/types';
	import { v4 as uuid } from 'uuid';

	let timer: boolean = true;
	let difficulty: string = 'medium';
	let size: number = 9;

	function createGame(gameProps: Game['props']) {
		let game: Game = {
			id: uuid(),
			currentBoard: [],
			correctBoard: [],
			props: {
				timer,
				difficulty,
				size
			}
		};

		const grid: number[][] = createStartingGrid();

		createSolution(grid);

		game.correctBoard = grid.map((row: number[]) => [...row]);

		// remove numbers from the grid based on difficulty
		if (gameProps.difficulty === 'easy') {
			grid.map((row, i) => {
				row.map((col, j) => {
					if (Math.random() < 0.5) {
						grid[i][j] = 0;
					}
				});
			});
		} else if (gameProps.difficulty === 'medium') {
			grid.map((row, i) => {
				row.map((col, j) => {
					if (Math.random() < 0.6) {
						grid[i][j] = 0;
					}
				});
			});
		} else if (gameProps.difficulty === 'hard') {
			grid.map((row, i) => {
				row.map((col, j) => {
					if (Math.random() < 0.8) {
						grid[i][j] = 0;
					}
				});
			});
		}

		game.currentBoard = grid;

		localStorage.setItem(game.id, JSON.stringify(game));

		goto(`/game/${game.id}`);
	}

	import Modal,{getModal} from './Modal.svelte'
	
	let selection
	
	// Callback function provided to the `open` function, it receives the value given to the `close` function call, or `undefined` if the Modal was closed with escape or clicking the X, etc.
	function setSelection(res){
		selection=res
	}
	
</script>

<!-- Simplest use: modal without an `id` or callback function -->
<button class="move" on:click={()=>getModal().open()}>
	Tutorial
</button>

<!-- the modal without an `id` -->
<Modal>
	<h1>Sudoku!</h1>
	<h2>The rules for sudoku are simple.
		A 4x4, 9×9, or 12x12 square must be filled in with numbers from 1-9 with no repeated numbers in each line, horizontally or vertically. </h2>
		
		<h2>To challenge you more, there are 3×3 squares marked out in the grid, and each of these squares can’t have any repeat numbers either. </h2>
		
		<h2>
	   The fewer numbers provided, the more difficult the puzzle.	   
		</h2>
	<!-- opening a model with an `id` and specifying a callback	 -->
	{#if selection}
	<p>
		Your selection was: {selection}
	</p>
	{/if}
</Modal>

<main class="flex flex-col items-center">
	<header>
		<h1 class="text-4xl">Sudoku</h1>
		<p class="text-lg">A simple sudoku game</p>
	</header>

	<div class="flex flex-col items-center w-1/4">
		<div class="flex flex-row items-center w-full justify-between">
			<p class="p-5 text-lg">Timer</p>
			<div class="inline-flex rounded-md shadow-sm" role="group">
				<button
					on:click={() => (timer = true)}
					type="button"
					class:active={timer === true}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-gray-100 active:text-blue-700"
				>
					Yes
				</button>
				<button
					on:click={() => (timer = false)}
					type="button"
					class:active={timer === false}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-grey-100 active:text-blue-700"
				>
					No
				</button>
			</div>
		</div>
		<div class="flex flex-row items-center  w-full justify-between">
			<p class="p-5 text-lg">Difficulty</p>
			<div class="inline-flex rounded-md shadow-sm" role="group">
				<button
					on:click={() => (difficulty = 'easy')}
					type="button"
					class:active={difficulty === 'easy'}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-gray-100 active:text-blue-700"
				>
					Easy
				</button>
				<button
					on:click={() => (difficulty = 'medium')}
					type="button"
					class:active={difficulty === 'medium'}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-grey-100 active:text-blue-700"
				>
					Medium
				</button>
				<button
					on:click={() => (difficulty = 'hard')}
					type="button"
					class:active={difficulty === 'hard'}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-grey-100 active:text-blue-700"
				>
					Hard
				</button>
			</div>
		</div>
		<div class="flex flex-row items-center  w-full justify-between">
			<p class="p-5 text-lg">Size</p>
			<div class="inline-flex rounded-md shadow-sm" role="group">
				<button
					on:click={() => (size = 4)}
					type="button"
					class:active={size === 4}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-gray-100 active:text-blue-700"
				>
					4x4
				</button>
				<button
					on:click={() => (size = 9)}
					type="button"
					class:active={size === 9}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-grey-100 active:text-blue-700"
				>
					9x9
				</button>
				<button
					on:click={() => (size = 16)}
					type="button"
					class:active={size === 16}
					class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white active:bg-grey-100 active:text-blue-700"
				>
					16x16
				</button>
			</div>
		</div>

		<!-- <a
			href="/game"
			class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
			>Start</a
		> -->
		<button
			on:click={() => createGame({ timer, difficulty, size })}
			class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
		>
			Start
		</button>
	</div>
</main>

<style>
	.active {
		background-color: rgb(219 234 254);
		color: rgb(23 37 84);
	}

	.move{
		background-color: white;
		color: Blue;
		width: 100%;
  		left: 0;
  		bottom: 10px;
  		position: absolute;
		font-weight:bold;
		font-variant: small-caps;

	}
</style>
