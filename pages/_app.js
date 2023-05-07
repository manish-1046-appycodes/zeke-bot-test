import Script from "next/script";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import SidebarContext from "../context/SidebarContext";

import RootLayout from "../components/layout";

import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <SidebarContext>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </SidebarContext>
      <Script src="/build/static/js/main.1668605a.js" />
      <chat-widget></chat-widget>
    </ThirdwebProvider>
  );
}

export default MyApp;
