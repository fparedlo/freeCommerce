import { Link } from "@tanstack/react-router";

export function LinkButton({
  url,
  text,
  extraClasses,
}: {
  url: string;
  text: string;
  extraClasses?: string;
}) {
  return (
    <Link
      to={url}
      className={
        extraClasses +
        " " +
        "text-white bg-black uppercase block text-center text-2xl py-4"
      }
    >
      {text}
    </Link>
  );
}
