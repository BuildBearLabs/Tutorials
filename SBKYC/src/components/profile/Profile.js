import React from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

import SignMessage from "../signMessage";
import "./profile.css";

const Profile = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center m-auto mb-4">
          <img src={ensAvatar} alt="ENS Avatar" />
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector?.name}</div>
          <button className="btn btn-outline-secondary" onClick={disconnect}>
            Disconnect
          </button>
        </div>
        <SignMessage address={address} />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-auto buttonWrapper">
      {connectors.map((connector) => (
        <button
          className="btn btn-primary my-2 buttonClass"
          disabled={!connector?.ready}
          key={connector?.id}
          onClick={() => connect({ connector })}
        >
          {connector?.name}
          {!connector?.ready && " (unsupported)"}
          {isLoading &&
            connector?.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Profile;
