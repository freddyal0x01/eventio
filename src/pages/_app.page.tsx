import { AppProps, ErrorBoundary } from "@blitzjs/next";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@uploadthing/react/styles.css";
import { Suspense } from "react";
import { withBlitz } from "src/blitz-client";
import { FullPageLoader } from "src/core/components/FullPageLoader";
import { RootErrorFallback } from "src/core/components/RootErrorFallback";
import "src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications position="top-right" />
        <Suspense fallback={<FullPageLoader />}>
          {<Component {...pageProps} />}
        </Suspense>
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default withBlitz(MyApp);
