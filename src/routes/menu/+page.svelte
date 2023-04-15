<script lang="ts">
	import { goto } from '$app/navigation';
	import { createSolution, createStartingGrid } from '$lib/utility';
	import type { Game } from '$lib/types';
	import { v4 as uuid } from 'uuid';

	let isTimer: boolean = true;
	let difficulty: string = 'medium';
	let size: number = 9;

	function createGame(gameProps: Game['props']) {
		let game: Game = {
			id: uuid(),
			currentBoard: [],
			correctBoard: [],
			originalBoard: [],
			mistakes: [],
			timer: {
				state: 'stopped',
				duration: 0
			},
			props: {
				isTimer,
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
		game.originalBoard = grid.map((row: number[]) => [...row]);

		localStorage.setItem(game.id, JSON.stringify(game));

		goto(`/game/${game.id}`);
	}
</script>

<main class="flex flex-col items-center">
	<header>
		<h1 class="text-4xl">Sudoku</h1>
		<p class="text-lg">A simple sudoku game</p>
	</header>

	<div class="flex w-1/4 flex-col items-center">
		<div class="flex w-full flex-row items-center justify-between">
			<p class="p-5 text-lg">Timer</p>
			<div class="inline-flex rounded-md shadow-sm" role="group">
				<button
					on:click={() => (isTimer = true)}
					type="button"
					class:active={isTimer === true}
					class="rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:bg-gray-100 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
				>
					Yes
				</button>
				<button
					on:click={() => (isTimer = false)}
					type="button"
					class:active={isTimer === false}
					class="active:bg-grey-100 rounded-r-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
				>
					No
				</button>
			</div>
		</div>
		<div class="flex w-full flex-row items-center justify-between">
			<p class="p-5 text-lg">Difficulty</p>
			<div class="inline-flex rounded-md shadow-sm" role="group">
				<button
					on:click={() => (difficulty = 'easy')}
					type="button"
					class:active={difficulty === 'easy'}
					class="rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:bg-gray-100 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
				>
					Easy
				</button>
				<button
					on:click={() => (difficulty = 'medium')}
					type="button"
					class:active={difficulty === 'medium'}
					class="active:bg-grey-100 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
				>
					Medium
				</button>
				<button
					on:click={() => (difficulty = 'hard')}
					type="button"
					class:active={difficulty === 'hard'}
					class="active:bg-grey-100 rounded-r-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
				>
					Hard
				</button>
			</div>
		</div>
		<div class="flex w-full flex-row items-center justify-between">
			<p class="p-5 text-lg">Size</p>
			<div class="inline-flex rounded-md shadow-sm" role="group">
				<button
					on:click={() => (size = 4)}
					type="button"
					class:active={size === 4}
					class="rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:bg-gray-100 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
				>
					4x4
				</button>
				<button
					on:click={() => (size = 9)}
					type="button"
					class:active={size === 9}
					class="active:bg-grey-100 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
				>
					9x9
				</button>
				<button
					on:click={() => (size = 16)}
					type="button"
					class:active={size === 16}
					class="active:bg-grey-100 rounded-r-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
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
			on:click={() => createGame({ isTimer, difficulty, size })}
			class="rounded-l-lg rounded-r-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
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
</style>
