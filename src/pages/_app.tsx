import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const app_id = process.env.NEXT_PUBLIC_APP_ID || "";
import { HuddleClient, HuddleProvider } from "@huddle01/react";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
      alchemyProvider({ apiKey: 'hqdFJBN-ewzXOTeSwSPehIHjYIjMxGyk' }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: '7f63771759d5563c547a79d7f4e54d35',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })
  const huddleClient = new HuddleClient({
    projectId: "oirwjtHBMERNfvA5kmwrpxz8Mi176hUL",
    options: {
      activeSpeakers: {
        size: 8,
      },
    },
  });
  return (
    <>
      {ready ? (
        <AnonAadhaarProvider _appId={app_id} _isWeb={false}>
          <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <HuddleProvider client={huddleClient}>
      <Component {...pageProps} />
      </HuddleProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </AnonAadhaarProvider>
      ) : null}
    </>
  );
}
