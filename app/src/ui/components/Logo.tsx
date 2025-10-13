interface LogoProps {
  sizeInPixels?: `${number}px`;
  borderInPixels?: `${number}px`;
  paddingInPixels?: `${number}px`;
}

export function Logo({
  sizeInPixels = "28px",
  borderInPixels = "2px",
  paddingInPixels = "10px",
}: LogoProps) {
  return (
    <div
      className="inline-block"
      style={{
        borderWidth: borderInPixels,
        padding: paddingInPixels,
        fontSize: sizeInPixels,
      }}
    >
      <span className="font-bold">Free</span>
      <span className="font-light">Commerce</span>
    </div>
  );
}
