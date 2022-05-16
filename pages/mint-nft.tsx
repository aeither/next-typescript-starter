import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetwork,
  useNFTCollection,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const MintNFT: NextPage = () => {
  const [image, setImage] = useState<File>();
  const network = useNetwork();

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const nftCollection = useNFTCollection(
    "Your address"
  ); // Public: For Tutorial

  const onImageChange = (e: any) => {
    const myFile = new File([e.target.files[0]], "image.png", {
      type: image?.type,
    });
    setImage(myFile);
  };

  const mint = () => {
    if (address && image) {
      const metadata = {
        name: "Cool NFT",
        description: "This is a cool NFT",
        image: image, // This can be an image url or file
      };
      nftCollection?.mintTo(address, metadata);
    }
  };

  return (
    <div>
      {address ? (
        <>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
          <p>Your network: {network[0].data.chain?.name}</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
          />
          {image && (
            <Image
              height="200px"
              width="200px"
              src={URL.createObjectURL(image)}
              alt="image"
            />
          )}
          <button onClick={mint}>Mint NFT</button>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default MintNFT;
