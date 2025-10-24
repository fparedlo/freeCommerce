export function ErrorInfo({ message }: { message?: string }) {
  const errorMessage = message || "An unknown error occurred";

  return (
    <p className="text-center text-lg">
      <span className="font-bold">An error has occurred:</span> {errorMessage}
    </p>
  );
}
