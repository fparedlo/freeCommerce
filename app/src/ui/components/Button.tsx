export function Button({
  type,
  text,
  extraClasses,
  action
}: {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  extraClasses?: string;
  action?: () => void;
}) {
  return (
    <button
      type={type}
      className={
        extraClasses +
        " " +
        "uppercase cursor-pointer bg-black text-white text-2xl py-4 px-6 block w-full hover:bg-neutral-800"
      }
      onClick={action}
    >
      {text}
    </button>
  );
}
