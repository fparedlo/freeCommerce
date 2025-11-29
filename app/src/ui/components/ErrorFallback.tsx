import { useNavigate } from "@tanstack/react-router";
import { Button } from "./Button";

interface ErrorFallbackProps {
  error: Error | null;
  resetError: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const navigate = useNavigate();
  const isDevelopment = import.meta.env.DEV;

  const handleGoHome = () => {
    resetError();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <span className="material-symbols-outlined text-6xl text-red-500">
            error
          </span>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-bold text-center mb-4">
          Oops! Something went wrong
        </h1>

        {/* Error Message */}
        <p className="text-gray-600 text-center mb-6">
          {isDevelopment && error
            ? "We encountered an error while rendering this page. Please try again."
            : "We're sorry, but something unexpected happened. Our team has been notified."}
        </p>

        {/* Error Details (Development Only) */}
        {isDevelopment && error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 overflow-auto max-h-48">
            <p className="text-sm font-mono text-red-800 whitespace-pre-wrap">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                  Stack trace
                </summary>
                <pre className="text-xs text-red-700 mt-2 overflow-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            text="Try Again"
            action={resetError}
            extraClasses="flex-1"
          />
          <Button
            type="button"
            text="Go Home"
            action={handleGoHome}
            invert
            extraClasses="flex-1"
          />
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-500 text-center mt-6">
          If this problem persists, please contact support or try refreshing the
          page.
        </p>
      </div>
    </div>
  );
}
