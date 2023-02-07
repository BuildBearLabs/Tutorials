import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { StoreMetadata } from "../components/StoreMetadata";
import { ethers } from "ethers";
import nft from "../components/nft.json";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);
  const [ipfs, setIpfs] = useState("");
  const [address, setAddress] = useState("Connect Wallet");
  async function connectwallet() {
    if (!window.ether) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAddress(address.slice(0, 6));

      console.log(await provider.getBlockNumber());
    } else {
      console.log("install metmask");
    }
  };

  const upload = async () => {
    try {
      const metadata = await StoreMetadata(img, name, description);
      const uri = metadata.url;
      setIpfs(uri);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nft.address, nft.abi, signer);
      let trx = await contract.mint(signer.getAddress(), uri);
      await trx.wait();
      let tt = await provider.getTransactionReceipt(trx.hash);
      console.log(tt);
      if (tt.status === 1) {
        alert("success");
        console.log("success");
        setText('');
      } else {
        alert("fail");
        console.log("fail");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.connectbutton} onClick={connectwallet}> {address}</button>

      <Head>
        <title>Mint NFTs</title>
        <meta
          name="description"
          content="Create and Upload metadata to IPFS in just a click"
        />
        <link rel="icon" href="/nfticon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>NFT3</a>
        </h1>

        <p className={styles.description}>
          Get started by filling the form for Metadata
        </p>

        <div className={styles.form}>
          <div className={styles.firstrow}>
            <input
              className={styles.input}
              type="text"
              value={name}
              placeholder="Name of the NFT"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className={styles.secondrow}>
            <input
              className={styles.input}
              type="text"
              value={description}
              placeholder="Description for the NFT"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className={styles.thirdrow}></div>
          <label className={styles.inputLabel}>
            <input
              className={styles.inputBox}
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            ></input>
          </label>
          <div className={styles.buttonRow}>
            <button onClick={upload} className={styles.button}>
              Mint 🚀
            </button>
          </div>
          <div className={styles.secondrow}>
            {/* {ipfsUri ? (
              <a className={styles.returnText} href={ipfsUri}>
                Ipfs Link{" "}
              </a>
            ) : (
              <a className={styles.returnText}>File is yet to upload</a>
            )} */}
          </div>
          {/* <div className={styles.secondrow}>
            {ipfs ? (
              <a className={styles.returnText} href={ipfs}>
                Ipfs URI {" "}
              </a>
            ) : (
              <a className={styles.returnText}>File is yet to upload</a>
            )}
          </div> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <p> Built by <a
          href="https://twitter.com/0xdhruva"
          target="_blank"
          rel="noopener noreferrer"
        >
          @0xDhruva
        </a> <a
          href="https://twitter.com/chandan1_"
          target="_blank"
          rel="noopener noreferrer"
        >
            @chandan1_
          </a></p>
        <a href="https://github.com/chandn0/NFTStorageDemoApp-main">Github</a>
      </footer>
    </div>
  );
}
