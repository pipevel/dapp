import { metadata } from "./wagmiConfig";
import { connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import scaffoldConfig from "~~/scaffold.config";

/*
const wallets = [
  metaMaskWallet,
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
  rainbowWallet,
  safeWallet,
  ...(!targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id) || !onlyLocalBurnerWallet
    ? [rainbowkitBurnerWallet]
    : []),
];
*/

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = () => {
  const { wallets } = getDefaultWallets({
    appName: metadata.name,
    projectId: "305d4a41f46f09065636b9710ac3b76c",
  });
  // Only create connectors on client-side to avoid SSR issues
  // TODO: update when https://github.com/rainbow-me/rainbowkit/issues/2476 is resolved
  if (typeof window === "undefined") {
    return [];
  }

  return connectorsForWallets(
    wallets,

    {
      appName: "scaffold-eth-2",
      projectId: scaffoldConfig.walletConnectProjectId,
    },
  );
};
