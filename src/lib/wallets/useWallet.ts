import { useAccount, useNetwork, useWalletClient } from "wagmi";
// import { useEthersSigner,  } from "./useSigner";

export default function useWallet() {
  const { address, isConnected, connector } = useAccount();
  const { chain } = useNetwork();
  const { data: client } = useWalletClient({ chainId: chain?.id });

  return {
    account: address,
    active: isConnected,
    connector,
    chainId: chain?.id,
    signer: client?.transport?.signer,
  };
}
