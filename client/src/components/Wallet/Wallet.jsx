import { useState, useEffect } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from "../../context/Web3Context";
import Button from "../Button/Button";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";
import { toast } from "react-hot-toast";
import "./Wallet.css";

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Define stable event handler functions
  const accountChangeHandler = () => handleAccountChange(setState);
  const chainChangeHandler = () => handleChainChange(setState);

  useEffect(() => {
    // Check if window.ethereum exists
    if (window.ethereum) {
      // Add event listeners
      window.ethereum.on('accountsChanged', accountChangeHandler);
      window.ethereum.on('chainChanged', chainChangeHandler);

      // Cleanup event listeners on component unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', accountChangeHandler);
        window.ethereum.removeListener('chainChanged', chainChangeHandler);
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once (on mount and unmount)

  const handleWallet = async () => {
    try {
      setIsLoading(true);
      const { provider, selectedAccount, stakingContract, stakeTokenContract, chainId } = await connectWallet();
      setState({ provider, selectedAccount, stakingContract, stakeTokenContract, chainId });
    } catch (error) {
      toast.error("Error connecting wallet");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Connect-Wallet">
      <Web3Context.Provider value={state}>{children}</Web3Context.Provider>
      {isLoading && <p>Loading...</p>}
      <Button onClick={handleWallet} type="button" label="Connect Wallet" />
    </div>
  );
};

export default Wallet;
