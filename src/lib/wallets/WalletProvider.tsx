import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, darkTheme, RainbowKitProvider, Theme, WalletList } from "@rainbow-me/rainbowkit";
import {
  ledgerWallet,
  safeWallet,
  rabbyWallet,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  rainbowWallet,
  imTokenWallet,
  zerionWallet,
  okxWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, arbitrumSepolia, avalanche, avalancheFuji } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import merge from "lodash/merge";
import { isDevelopment } from "config/env";
import { coreWallet } from "./connecters/core/coreWallet";
import { bitgetWallet } from "./connecters/bitgetWallet/bitgetWallet";
import binanceWallet from "./connecters/binanceW3W/binanceWallet";

const WALLET_CONNECT_PROJECT_ID = "33b533a1d36c81d5774f51bdf0d814de";
const APP_NAME = "tPerp";

const walletTheme = merge(darkTheme(), {
  colors: {
    modalBackground: "#16182e",
    accentColor: "#9da5f2",
    menuItemBackground: "#808aff14",
  },
  radii: {
    modal: "4px",
    menuButton: "4px",
  },
} as Theme);

const { chains, publicClient } = configureChains(
  [arbitrum, avalanche, ...(isDevelopment() ? [arbitrumSepolia, avalancheFuji] : [])],
  [publicProvider()]
);

const recommendedWalletList: WalletList = [
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      safeWallet({ chains }),
      rabbyWallet({ chains }),
      metaMaskWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      walletConnectWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
    ],
  },
];

const othersWalletList: WalletList = [
  {
    groupName: "Others",
    wallets: [
      coreWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      coinbaseWallet({ appName: APP_NAME, chains }),
      binanceWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      okxWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      ledgerWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      rainbowWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      bitgetWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      zerionWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
      imTokenWallet({ chains, projectId: WALLET_CONNECT_PROJECT_ID }),
    ],
  },
];

const connectors = connectorsForWallets([...recommendedWalletList, ...othersWalletList]);

const config = createConfig({
  connectors,
  publicClient,
});

export default function WalletProvider({ children }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={walletTheme} chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
