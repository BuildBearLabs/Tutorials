import { useEffect, useState } from "react";
import { bbSupportedERC20Tokens } from "../../buildbear/constants.mjs";
import buildBearSandbox from "../sandbox.json";
import ERC20Artifact from "@openzeppelin/contracts/build/contracts/IERC20.json";
import { ethers } from "ethers";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { Address as AddressType } from "viem";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractUI } from "~~/components/scaffold-eth";
import { AddressInput, EtherInput, getParsedError } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getContractNames } from "~~/utils/scaffold-eth/contractNames";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";
const contractNames = getContractNames();

const Debug: NextPage = () => {
  const [selectedContract, setSelectedContract] = useLocalStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
  );
  const [erc20inputAddress, setErc20InputAddress] = useState<AddressType>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [erc20TokenAddress, setErc20TokenAddress] = useState<string>("");
  const [sendErc20Value, setSendErc20Value] = useState("");
  const [loading, setLoading] = useState(false);

  const updateTokenAddress = (newValue: any) => {
    setErc20TokenAddress(newValue.target.value);
    console.log(newValue.target.value);
  };
  const erc20Tokens: any = buildBearSandbox ? bbSupportedERC20Tokens[buildBearSandbox.forkingChainId] : {};
  const erc20Options = Object.keys(erc20Tokens).map(tokenSymbol => ({
    value: erc20Tokens[tokenSymbol]?.address,
    label: tokenSymbol,
  }));

  useEffect(() => {
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [selectedContract, setSelectedContract]);

  const erc20faucet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const ERC20Contract = new ethers.Contract(erc20TokenAddress, ERC20Artifact.abi, signer);
      await ERC20Contract.approve(erc20inputAddress, sendErc20Value);
      notification.success("Token Approve Successfully");
    } catch (error) {
      const parsedError = getParsedError(error);
      console.error("⚡️ ~ file: Faucet.tsx:sendETH ~ error", error);
      notification.error(parsedError);
      setLoading(false);
    }
  };
  return (
    <>
      <MetaHeader
        title="Debug Contracts | Scaffold-ETH 2"
        description="Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way"
      />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        {contractNames.length === 0 ? (
          <p className="text-3xl mt-14">No contracts found!</p>
        ) : (
          <>
            {contractNames.length > 1 && (
              <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
                {contractNames.map(contractName => (
                  <button
                    className={`btn btn-secondary btn-sm normal-case font-thin ${
                      contractName === selectedContract ? "bg-base-300" : "bg-base-100"
                    }`}
                    key={String(contractName)}
                    onClick={() => setSelectedContract(contractName)}
                  >
                    {String(contractName)}
                  </button>
                ))}
              </div>
            )}
            {contractNames.map(contractName => (
              <ContractUI
                key={String(contractName)}
                contractName={contractName}
                className={contractName === selectedContract ? "" : "hidden"}
              />
            ))}
          </>
        )}
      </div>
      <div className="center text-center mt-8 bg-secondary p-10 flex justify-center items-center">
        <div className="w-96 justify-center items-center">
          <h1 className="text-4xl my-0">Approve ERC-20 Tokens </h1>
          <select
            className="select select-bordered focus:outline-none focus:bg-transparent mt-4 focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium text-gray-400 bg-base-200"
            onChange={value => updateTokenAddress(value)}
          >
            <option className="text-gray-400 bg-base-200" value="">
              Select ERC-20 Token
            </option>
            {erc20Options.map(option => (
              <option className="text-gray-400 bg-base-200" key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex flex-col space-y-3 w-96 mt-4">
            <AddressInput
              placeholder="Approve to Address"
              value={erc20inputAddress ?? ""}
              onChange={value => setErc20InputAddress(value)}
            />
            <EtherInput
              placeholder="Amount to Approve"
              value={sendErc20Value}
              onChange={value => setSendErc20Value(value)}
            />
            <button className="h-10 btn btn-primary btn-sm px-2 rounded-full" onClick={erc20faucet} disabled={loading}>
              {!loading ? (
                <BanknotesIcon className="h-6 w-6" />
              ) : (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              <span>Approve ERC-20 Token</span>
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Debug Contracts</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / pages / debug.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default Debug;
