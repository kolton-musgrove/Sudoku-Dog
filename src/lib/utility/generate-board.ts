export function createStartingGrid(): number[][] {
	let grid: number[][] = new Array(9).fill(new Array(9).fill(0));

	// randomly select a cell and assign a number between 1 and 9 to it
	let rowNum = Math.floor(Math.random() * 9);
	let colNum = Math.floor(Math.random() * 9);
	let num = Math.floor(Math.random() * 9) + 1;

	grid = grid.map((row, rowIndex) => {
		return row.map((_, colIndex) => {
			if (rowIndex === rowNum && colIndex === colNum) {
				return num;
			}

			return 0;
		});
	});

	// the above method in conjunction with the backtracking algorithm
	// will create a puzzle with the same top-left grid. To prevent this,
	// we will randomly select a cell in the top-left grid and assign it.
	// This is a temporary solution that might cause the puzzle to be unsolvable.

	// randomly select a cell in the top-left grid
	rowNum = Math.floor(Math.random() * 3);
	colNum = Math.floor(Math.random() * 3);
	num = Math.floor(Math.random() * 9) + 1;

	grid[rowNum][colNum] = num;
	grid = grid;

	return grid;
}

/**
 * an in-place backtracking algorithm to solve a sudoku board
 * returns true if a solution is found
 */
export function createSolution(board: number[][]): boolean {
	// Find an unassigned cell
	let [row, col]: [number, number] = findUnassignedCell(board);

	// If all cells are assigned, the board is solved
	if (row === -1 && col === -1) return true;

	// Try assigning a value to the unassigned cell
	for (let num = 1; num <= 9; num++) {
		if (isSafe(board, row, col, num)) {
			board[row][col] = num;

			// Recursively solve the board
			if (createSolution(board)) {
				return true;
			}

			// If the current assignment does not lead to a solution, backtrack
			board[row][col] = 0;
		}
	}

	// If no value can be assigned to the unassigned cell, the board is unsolvable
	return false;
}

/**
 * finds the first unassigned cell in the board
 * returns [-1, -1] if no unassigned cell is found
 */
function findUnassignedCell(board: number[][]): [number, number] {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				return [row, col];
			}
		}
	}

	return [-1, -1];
}

function isSafe(board: number[][], row: number, col: number, num: number): boolean {
	// Check row
	for (let c = 0; c < 9; c++) {
		if (board[row][c] === num) {
			return false;
		}
	}

	// Check column
	for (let r = 0; r < 9; r++) {
		if (board[r][col] === num) {
			return false;
		}
	}

	// Check 3x3 box
	let boxRow = Math.floor(row / 3) * 3;
	let boxCol = Math.floor(col / 3) * 3;

	for (let r = boxRow; r < boxRow + 3; r++) {
		for (let c = boxCol; c < boxCol + 3; c++) {
			if (board[r][c] === num) {
				return false;
			}
		}
	}

	// If the number is not already in the row, column, or 3x3 box, it is safe to assign
	return true;
}
