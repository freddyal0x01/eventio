import { ErrorBoundary, AppProps } from "@blitzjs/next";
import React, { Suspense } from "react";
import { withBlitz } from "src/blitz-client";
import { RootErrorFallback } from "src/core/components/RootErrorFallback";
import "src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Suspense fallback="Loading...">{<Component {...pageProps} />}</Suspense>
    </ErrorBoundary>
  );
}

export default withBlitz(MyApp);
