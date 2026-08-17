export function PetDrawing() {
  return (
    <span className="pet-art" aria-hidden="true">
      <span className="pet-canvas">
        <i className="paint-sun" />
        <i className="paint-hill paint-hill--back" />
        <i className="paint-hill paint-hill--front" />
        <i className="paint-flower">✿</i>
      </span>
      <span className="pet-brush" />
      <span className="pet-palette"><i /><i /><i /></span>
    </span>
  );
}
