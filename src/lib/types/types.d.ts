export type Game = {
	id: string;
	currentBoard: number[][];
	correctBoard: number[][];
	props: {
		timer: boolean;
		difficulty: string;
		size: number;
	};
};
