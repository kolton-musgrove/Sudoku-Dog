<script lang="ts">
	import { goto } from '$app/navigation';
	import { createSolution, createStartingGrid } from '$lib/utility';
	import { Modal } from '$lib/components';
	import type { Game } from '$lib/types';
	import { v4 as uuid } from 'uuid';

	let isTimer: boolean = true;
	let difficulty: string = 'medium';
	let size: number = 9;

	let showModal: boolean = false;

	function createGame(gameProps: Game['props']) {
		let game: Game = {
			id: uuid(),
			currentBoard: [],
			correctBoard: [],
			originalBoard: [],
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

		const solution: number[][] = createStartingGrid();

		createSolution(solution);

		game.correctBoard = solution;

		const gameBoard: (number | null)[][] = solution.map((row: number[]) => [...row]);

		// remove numbers from the grid based on difficulty
		if (gameProps.difficulty === 'easy') {
			gameBoard.map((row, i) => {
				row.map((col, j) => {
					if (Math.random() < 0.5) {
						gameBoard[i][j] = null;
					}
				});
			});
		} else if (gameProps.difficulty === 'medium') {
			gameBoard.map((row, i) => {
				row.map((col, j) => {
					if (Math.random() < 0.6) {
						gameBoard[i][j] = null;
					}
				});
			});
		} else if (gameProps.difficulty === 'hard') {
			gameBoard.map((row, i) => {
				row.map((col, j) => {
					if (Math.random() < 0.8) {
						gameBoard[i][j] = null;
					}
				});
			});
		}

		game.currentBoard = gameBoard;
		game.originalBoard = gameBoard.map((row: (number | null)[]) => [...row]);

		localStorage.setItem(game.id, JSON.stringify(game));

		goto(`/game/${game.id}`);
	}
</script>

<main class="flex h-full w-full flex-col items-center">
	<header class="text-center">
		<h1 class="text-4xl">Sudoku Dog</h1>
		<p class="text-lg">A simple sudoku game</p>
	</header>

	<div class="flex flex-col items-center lg:w-1/4">
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

	<button
		on:click={() => (showModal = true)}
		class="mt-24 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 active:bg-gray-100 active:text-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-50"
	>
		Tutorial
	</button>

	<Modal bind:showModal>
		<div class="flex w-full flex-col dark:bg-gray-700">
			<h1 class="mb-2 self-center text-lg font-bold">Sudoku!</h1>

			<ul class="ml-5 list-disc">
				<li class="mb-1">A Sudoku puzzle is a 9x9 grid of squares, divided into 3x3 regions.</li>

				<li class="mb-1">
					The objective is to fill the grid with numbers from 1 to 9, so that each row, column and
					region contains each number only once. So you can’t have two ‘1’s in the same row, column
					or region.
				</li>

				<li class="mb-1">
					To solve a sudoku, you need to use logic to work out which numbers can go in each square.
				</li>
			</ul>
		</div>
	</Modal>
</main>

<style>
	.active {
		background-color: rgb(219 234 254);
		color: rgb(23 37 84);
	}
</style>
