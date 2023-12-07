import { ErrorComponent, ErrorFallbackProps } from "@blitzjs/next";
import { AuthenticationError, AuthorizationError } from "blitz";
import { MainAuthenticationForm } from "./MainAuthenticationForm";

export function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <MainAuthenticationForm />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}
