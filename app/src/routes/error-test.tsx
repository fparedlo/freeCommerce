import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/ui/components";

export const Route = createFileRoute("/error-test")({
  component: RouteComponent,
});

function RouteComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will trigger the ErrorBoundary
    throw new Error("Test error triggered! ErrorBoundary should catch this.");
  }

  return (
    <section className="mt-16 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
        <h1 className="text-3xl font-bold mb-4">Error Boundary Test</h1>
        <p className="text-gray-600 mb-6">
          This is a test page to demonstrate the ErrorBoundary functionality.
          Click the button below to trigger an error and see the error boundary
          in action.
        </p>

        <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This will intentionally crash this component.
            The ErrorBoundary will catch it and show a recovery screen.
          </p>
        </div>

        <Button
          type="button"
          text="Trigger Error"
          action={() => setShouldError(true)}
        />

        <div className="mt-8 text-sm text-gray-500">
          <p>When you click the button:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>This component will throw an error</li>
            <li>ErrorBoundary will catch it</li>
            <li>You'll see a user-friendly error screen</li>
            <li>In development, you'll see the error details</li>
            <li>You can use "Try Again" to reset the error state</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
