interface SudokuBoardProps {
  values: number[];
  puzzle: number[];
  solution: number[];
  selected: number | null;
  onSelect: (index: number) => void;
}

export function SudokuBoard({ values, puzzle, solution, selected, onSelect }: SudokuBoardProps) {
  return (
    <div className="sudoku-board" role="grid" aria-label="Поле судоку">
      {values.map((value, index) => {
        const fixed = puzzle[index] !== 0;
        const wrong = value !== 0 && value !== solution[index];
        return (
          <button
            className={`${fixed ? 'fixed' : ''} ${wrong ? 'wrong' : ''} ${selected === index ? 'selected' : ''}`}
            type="button"
            role="gridcell"
            key={index}
            onClick={() => !fixed && onSelect(index)}
            aria-label={`Строка ${Math.floor(index / 9) + 1}, столбец ${index % 9 + 1}${value ? `, цифра ${value}` : ''}`}
          >
            {value || ''}
          </button>
        );
      })}
    </div>
  );
}
