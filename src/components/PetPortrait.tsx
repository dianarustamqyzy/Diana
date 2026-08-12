interface PetPortraitProps {
  image: string;
  className: string;
}

export function PetPortrait({ image, className }: PetPortraitProps) {
  return (
    <span
      className={`pet-portrait ${className}`}
      style={{ backgroundImage: `url(${image})` }}
      aria-hidden="true"
    />
  );
}
