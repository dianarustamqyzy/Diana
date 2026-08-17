type GoogleAuthButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export function GoogleAuthButton({ disabled, onClick }: GoogleAuthButtonProps) {
  return (
    <button
      className="google-button"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span className="google-icon" aria-hidden="true">G</span>
      Продолжить с Google
    </button>
  );
}
