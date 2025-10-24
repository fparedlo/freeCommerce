export function Button({
  type,
  text,
  extraClasses,
  action,
  invert,
}: {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  extraClasses?: string;
  action?: () => void;
  invert?: boolean;
}) {
  const buttonStyles = !invert
    ? "uppercase cursor-pointer bg-black text-white text-2xl py-4 px-6 block w-full hover:bg-neutral-800" +
      " " +
      extraClasses
    : "uppercase cursor-pointer bg-white text-neutral-800 text-2xl py-3 px-6 block w-full hover:border-black hover:text-black border-2" +
      " " +
      extraClasses;

  return (
    <button type={type} className={buttonStyles} onClick={action}>
      {text}
    </button>
  );
}
