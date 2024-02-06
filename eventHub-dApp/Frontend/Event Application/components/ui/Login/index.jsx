import React, { useState } from "react";
import eventhubLogo from "../../../public/logo.png";
import Image from "next/image";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "components/GolabalReducers/Features/UserCredentials";
import { useRouter } from "next/router";
import contractABI from "../../../artifacts/contractABI.json";
import { FailedToast, SuccessToast } from "@/utils/toast";

const Login = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const dispatch = useDispatch();
  const Navigate = useRouter();
  const userCredentials = useSelector((state) => state.userCredentials);
  console.log(userCredentials);

  const contractAddress = "0xB67B982508fBA0DcD296256c90de7173956F4db1";

  const connectWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          changeAccount(result[0]);
          SuccessToast("Logined Successfully")
        })
        .catch((error) => {
          FailedToast(error.message)
        });
    } else {
      FailedToast("Need to install MetaMask")
    }
  };

  const changeAccount = (AccountAddress) => {
    calculateBalance(AccountAddress.toString());
    setWalletAddress(AccountAddress);
    updateEthers();
    Navigate.push("/");
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };
  const calculateBalance = (AccountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [AccountAddress, "latest"],
      })
      .then((result) => {
        dispatch(
          setUser({
            address: AccountAddress,
            availableBalance: ethers.formatEther(result),
          })
        );
        setWalletBalance(ethers.formatEther(result));
      });
  };
  if (typeof window !== "undefined") {
    // Code that relies on the window object
    window.ethereum.on("accountChanged", changeAccount);
    window.ethereum.on("chainChanged", chainChangedHandler);
  }

  const updateEthers = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const signer = await provider.getSigner();
    setSigner(signer);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="mx-auto container flex h-screen w-full flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          <div className="m-auto flex flex-col space-y-2 text-center">
            <Image
              className="h-[auto] w-[200px]"
              src={eventhubLogo}
              alt="EventHub Logo"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-6 w-6"
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Connect your metamask wallet to sign in
            </p>
          </div>

          <div className="grid gap-6">
            <button
              onClick={connectWallet}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            >
              <svg className="mr-2 h-4 w-4" /> Connect Wallet 🦊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
