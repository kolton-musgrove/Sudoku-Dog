export const grid: number[][] = [
	[0, 0, 6, 5, 0, 8, 4, 0, 0],
	[5, 2, 0, 0, 0, 0, 0, 0, 0],
	[0, 8, 7, 0, 0, 0, 0, 3, 1],
	[0, 0, 3, 0, 1, 0, 0, 8, 0],
	[9, 0, 0, 8, 6, 3, 0, 0, 5],
	[0, 5, 0, 0, 9, 0, 6, 0, 0],
	[1, 3, 0, 0, 0, 0, 2, 5, 0],
	[0, 0, 0, 0, 0, 0, 0, 7, 4],
	[0, 0, 5, 2, 0, 6, 3, 0, 0]
];

// export function createStartingGrid(): number[][] {
//   const grid: number[][] = new Array(9).fill(new Array(9).fill(0))

//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (Math.random() > 0.95) {
//         grid[i][j] = Math.floor(Math.random() * 9) + 1
//       }
//     }
//   }

//   console.log(`Starting grid, ${grid}`)

//   return grid
// }

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
