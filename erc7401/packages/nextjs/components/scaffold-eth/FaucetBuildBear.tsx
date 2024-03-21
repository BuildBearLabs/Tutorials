import { useState } from "react";
import { bbSupportedERC20Tokens } from "../../../buildbear/constants.mjs";
import buildBearSandbox from "../../sandbox.json";
import axios from "axios";
import { Address as AddressType } from "viem";
import { useNetwork } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { AddressInput, EtherInput, getParsedError } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

// Account index to use from generated hardhat accounts.

/**
 * Faucet modal which lets you send ETH to any address.
 */
export const FaucetBuildBear = () => {
  const [loading, setLoading] = useState(false);
  const [inputAddress, setInputAddress] = useState<AddressType>();
  const [erc20inputAddress, setErc20InputAddress] = useState<AddressType>();
  const [sendValue, setSendValue] = useState("");
  const [sendErc20Value, setSendErc20Value] = useState("");
  const [erc20TokenAddress, setErc20TokenAddress] = useState<string | null>(null);

  const updateTokenAddress = (newValue: any) => {
    setErc20TokenAddress(newValue.target.value);
    console.log(newValue.target.value);
  };
  const erc20Tokens = buildBearSandbox ? bbSupportedERC20Tokens[buildBearSandbox.forkingChainId] : {};
  const erc20Options = Object.keys(erc20Tokens).map(tokenSymbol => ({
    value: erc20Tokens[tokenSymbol]?.address,
    label: tokenSymbol,
  }));

  useNetwork();

  const nativefaucet = async () => {
    try {
      const data = {
        jsonrpc: "2.0",
        id: 1,
        method: "buildbear_nativeFaucet",
        params: [
          {
            address: inputAddress,
            balance: sendValue,
          },
        ],
      };
      const config = {
        method: "post",
        url: buildBearSandbox.rpcUrl,
        data,
      };
      await axios(config);
      notification.success("Minted Native Tokens Successfully");
    } catch (error) {
      const parsedError = getParsedError(error);
      console.error("⚡️ ~ file: Faucet.tsx:sendETH ~ error", error);
      notification.error(parsedError);
      setLoading(false);
    }
  };
  const erc20faucet = async () => {
    try {
      const data = {
        jsonrpc: "2.0",
        id: 1,
        method: "buildbear_ERC20Faucet",
        params: [
          {
            address: erc20inputAddress,
            balance: sendErc20Value,
            token: erc20TokenAddress,
          },
        ],
      };
      const config = {
        method: "post",
        url: buildBearSandbox.rpcUrl,
        data,
      };
      await axios(config);
      notification.success("Minted ERC20 Tokens Successfully");
    } catch (error) {
      const parsedError = getParsedError(error);
      console.error("⚡️ ~ file: Faucet.tsx:sendETH ~ error", error);
      notification.error(parsedError);
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="faucet-modal" className="btn btn-primary btn-sm font-normal normal-case gap-1">
        <BanknotesIcon className="h-4 w-4" />
        <span>Faucet</span>
      </label>
      <input type="checkbox" id="faucet-modal" className="modal-toggle" />
      <label htmlFor="faucet-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          {/* dummy input to capture event onclick on modal box */}
          <input className="h-0 w-0 absolute top-0 left-0" />
          <h3 className="text-xl font-bold mb-3">BuildBear Faucet</h3>
          <label htmlFor="faucet-modal" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
            ✕
          </label>
          <div className="space-y-3">
            <h3>Native Tokens</h3>
            <div className="flex flex-col space-y-3">
              <AddressInput
                placeholder="Destination Address"
                value={inputAddress ?? ""}
                onChange={value => setInputAddress(value)}
              />
              <EtherInput placeholder="Amount to send" value={sendValue} onChange={value => setSendValue(value)} />
              <button
                className="h-10 btn btn-primary btn-sm px-2 rounded-full"
                onClick={nativefaucet}
                disabled={loading}
              >
                {!loading ? (
                  <BanknotesIcon className="h-6 w-6" />
                ) : (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                <span>Mint Native Tokens</span>
              </button>
            </div>
            <h3>ERC20 Tokens</h3>
            <div>
              <select
                className="select select-bordered focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium text-gray-400 bg-base-200"
                onChange={value => updateTokenAddress(value)}
              >
                <option className="text-gray-400 bg-base-200" value="">
                  Select ERC20 Token
                </option>
                {erc20Options.map(option => (
                  <option className="text-gray-400 bg-base-200" key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-3">
              <AddressInput
                placeholder="Destination Address"
                value={erc20inputAddress ?? ""}
                onChange={value => setErc20InputAddress(value)}
              />
              <EtherInput
                placeholder="Amount to send"
                value={sendErc20Value}
                onChange={value => setSendErc20Value(value)}
              />
              <button
                className="h-10 btn btn-primary btn-sm px-2 rounded-full"
                onClick={erc20faucet}
                disabled={loading}
              >
                {!loading ? (
                  <BanknotesIcon className="h-6 w-6" />
                ) : (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                <span>Mint ERC20 Tokens</span>
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};
