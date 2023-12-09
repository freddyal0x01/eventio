import { AppProps, ErrorBoundary } from "@blitzjs/next";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Suspense } from "react";
import { withBlitz } from "src/blitz-client";
import { FullPageLoader } from "src/core/components/FullPageLoader";
import { RootErrorFallback } from "src/core/components/RootErrorFallback";
import { globalModals } from "src/modals";
import "src/styles/globals.css";
import { theme } from "src/styles/mantine-theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <ModalsProvider modals={globalModals}>
        <ErrorBoundary FallbackComponent={RootErrorFallback}>
          <Notifications position="top-right" />
          <Suspense fallback={<FullPageLoader />}>
            {<Component {...pageProps} />}
          </Suspense>
        </ErrorBoundary>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default withBlitz(MyApp);
