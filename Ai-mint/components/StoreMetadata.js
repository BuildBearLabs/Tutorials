import { NFTStorage } from "nft.storage";
import { NFT_STORAGE_API_KEY } from "../constants";

/// used NFT.storage to prepare the metadata for the NFT
export const StoreMetadata = async (image, Name, Description) => {
  // const nftstorage_key = process.env.NFT_STORAGE_API_KEY;

  console.log("Preparing Metadata ....");
  const nft = {
    image: image,
    name: Name,
    description: Description,
  };
  console.log("Uploading Metadata to IPFS ....");
  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const metadata = await client.store(nft);
  console.log(metadata);
  console.log("NFT data stored successfully 🚀🚀");
  console.log("Metadata URI: ", metadata.url);

  return metadata;
};
