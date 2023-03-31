import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ethers } from "ethers";
import { address, abi } from "../components/Lottery.json";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);
  const [ipfs, setIpfs] = useState("");
  const [Useraddress, setUserAddress] = useState("Connect Wallet");
  async function connectwallet() {
    if (!window.ether) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const uaddress = await signer.getAddress();
      setUserAddress(uaddress.slice(0, 6));
      console.log(await provider.getBlockNumber());
    } else {
      console.log("install metmask");
    }
  };

  async function Buy() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    let buy = await contract.participate(1, { value: 100000000 });
    buy.wait().then((receipt) => {
      if (buy) {
        alert("Transaction Successful you have bought the ticket");
      } else {
        alert("Transaction Failed");
      }
    });
  }


  return (
    <div className={styles.container}>
      <button className={styles.connectbutton} onClick={connectwallet}> {Useraddress}</button>

      <Head>
        <title> NFTs Lottery</title>
        <meta
          name="description"
          content="NFTs Lottery"
        />
        <link rel="icon" href="/nfticon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>NFTs Lottery</a>
        </h1>
        <br />
        <p className={styles.description}>
          Buy the ticket and win the NFT
        </p>
        <div className={styles.description} >
          <h4 > Creator: 0xaC714DA06C93b0cF4450b78Ba07EE6B589ed9A0E</h4>
          <h4>Start Date and time (GMT): Saturday, April 1, 2023 12:30:58 PM</h4>
          <h4>End Date and time (GMT): Sunday, April 2, 2023 12:30:58 PM</h4>
          <h4>Price: 100000000  WEI</h4>
          <img src="https://gateway.ipfs.io/ipfs/bafybeiagdp6nkgqccbtohxxryukn4uqxtw4xlxka2mjcbcfknso56btoui/Final%20%20Twitter-Credshields%20X%20Buildbear%20%282%29.jpg" width={400} />
          <h4>NFT Address: 0xE9e33E4c1C135CFe04c2DE18DDACC51135DB5c6E</h4>
          <h4>NFT Token ID : 1</h4>
          <button className={styles.button} onClick={Buy}> Buy</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p> Built by  <a
          href="https://twitter.com/chandan1_"
          target="_blank"
          rel="noopener noreferrer"
        >
          @chandan1_
        </a></p>

      </footer>
    </div>
  );
}
