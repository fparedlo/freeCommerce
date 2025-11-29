export function Button({
  type,
  text,
  extraClasses,
  action,
  invert,
  disabled,
}: {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  extraClasses?: string;
  action?: () => void;
  invert?: boolean;
  disabled?: boolean;
}) {
  let buttonStyles = !invert
    ? "uppercase cursor-pointer bg-black text-white text-2xl py-4 px-6 block w-full hover:bg-neutral-800"
    : "uppercase cursor-pointer bg-white text-neutral-800 text-2xl py-3 px-6 block w-full hover:border-black hover:text-black border-2";

  if (disabled) {
    buttonStyles =
      "uppercase cursor-not-allowed bg-neutral-300 text-neutral-500 text-2xl py-4 px-6 block w-full";
  } else if (extraClasses) {
    buttonStyles += " " + extraClasses;
  }

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={action}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
