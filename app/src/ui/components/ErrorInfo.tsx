export function ErrorInfo({ message }: { message: string }) {
  return (
    <p className="text-center text-lg">
      <span className="font-bold">An error has occurred:</span> {message}
    </p>
  );
}
