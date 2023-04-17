export type Game = {
	id: string;
	currentBoard: (number | null)[][];
	correctBoard: number[][];
	originalBoard: (number | null)[][];
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
