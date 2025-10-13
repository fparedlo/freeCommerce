export function Button({
  type,
  text,
  extraClasses,
}: {
  type: "submit" | "reset" | "button" | undefined;
  text: string;
  extraClasses?: string;
}) {
  return (
    <button
      type={type}
      className={
        extraClasses +
        " " +
        "uppercase cursor-pointer bg-black text-white text-2xl py-4 px-6 block w-full hover:bg-neutral-800"
      }
    >
      {text}
    </button>
  );
}
