import { ethers } from "ethers";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Header from "./Header";

type ContextType = {
  walletAddress: string | undefined;
  provider: ethers.BrowserProvider;
};

export default function Root() {
  const provider = new ethers.BrowserProvider(window.ethereum);

  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  return (
    <>
      <Header
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        provider={provider}
      />
      <div id="detail">
        <Outlet context={{ walletAddress, provider }} />
      </div>
    </>
  );
}

export function useEthereum() {
  return useOutletContext<ContextType>();
}
