import { Link } from "@tanstack/react-router";

export function LinkButton({
  url,
  text,
  extraClasses,
  invert,
}: {
  url: string;
  text: string;
  extraClasses?: string;
  invert?: boolean;
}) {
  const buttonStyles = !invert
    ? "uppercase cursor-pointer bg-black text-white text-2xl py-4 px-6 block w-full hover:bg-neutral-800 text-center" +
      " " +
      extraClasses
    : "uppercase cursor-pointer bg-white text-black text-2xl py-3 px-6 block w-full hover:bg-neutral-800 border-2 text-center" +
      " " +
      extraClasses;

  return (
    <Link to={url} className={buttonStyles}>
      {text}
    </Link>
  );
}
