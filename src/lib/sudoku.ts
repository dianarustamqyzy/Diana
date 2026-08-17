export interface SudokuGame {
  puzzle: number[];
  solution: number[];
}

const baseSolution = [
  5,3,4,6,7,8,9,1,2, 6,7,2,1,9,5,3,4,8, 1,9,8,3,4,2,5,6,7,
  8,5,9,7,6,1,4,2,3, 4,2,6,8,5,3,7,9,1, 7,1,3,9,2,4,8,5,6,
  9,6,1,5,3,7,2,8,4, 2,8,7,4,1,9,6,3,5, 3,4,5,2,8,6,1,7,9,
];

const visibleCells = new Set([
  0,1,4,9,12,13,14,17,19,20,24,25,27,29,30,32,35,36,39,41,44,
  45,48,50,51,53,55,56,60,61,63,66,67,68,71,76,79,80,
]);

function shuffledDigits() {
  const digits = [1,2,3,4,5,6,7,8,9];
  for (let index = digits.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [digits[index], digits[swap]] = [digits[swap], digits[index]];
  }
  return digits;
}

export function createSudokuGame(): SudokuGame {
  const digits = shuffledDigits();
  const solution = baseSolution.map((value) => digits[value - 1]);
  return {
    solution,
    puzzle: solution.map((value, index) => visibleCells.has(index) ? value : 0),
  };
}
