interface SudokuControlsProps {
  disabled: boolean;
  onNumber: (value: number) => void;
  onErase: () => void;
}

export function SudokuControls({ disabled, onNumber, onErase }: SudokuControlsProps) {
  return (
    <div className="sudoku-controls">
      <div>{[1,2,3,4,5,6,7,8,9].map((number) => <button type="button" key={number} disabled={disabled} onClick={() => onNumber(number)}>{number}</button>)}</div>
      <button className="sudoku-erase" type="button" disabled={disabled} onClick={onErase}>Стереть</button>
    </div>
  );
}
