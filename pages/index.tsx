import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetwork,
  useNFTCollection,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [image, setImage] = useState<Blob>();
  const network = useNetwork();

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const nftCollection = useNFTCollection();
  // "0x7c142BBc91D3E2e03c81b1C969451416E5BeEF1f"

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
          <p>Your network: {network[0].data.chain?.name}</p>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
