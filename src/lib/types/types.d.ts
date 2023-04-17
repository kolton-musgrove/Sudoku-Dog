export type Game = {
	id: string;
	currentBoard: number[][];
	correctBoard: number[][];
	originalBoard: number[][];
	mistakes: number[][]; // [x, y]
	timer: Timer;
	props: {
		isTimer: boolean;
		difficulty: string;
		size: number;
	};
};

type Timer = {
	state: 'running' | 'paused' | 'stopped';
	duration: number;
};
