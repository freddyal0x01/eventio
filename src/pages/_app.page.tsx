import { AppProps, ErrorBoundary } from "@blitzjs/next";
import { Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Suspense } from "react";
import { withBlitz } from "src/blitz-client";
import { RootErrorFallback } from "src/core/components/RootErrorFallback";
import "src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <Notifications position="top-right" />
        <Suspense fallback={<Loader />}>
          {<Component {...pageProps} />}
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default withBlitz(MyApp);
