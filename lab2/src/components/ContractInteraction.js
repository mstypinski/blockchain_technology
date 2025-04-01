import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getBrowserProvider, getContractABI, getContractAddress } from "../utils"

const CONTRACT_ADDRESS = '0xDd43B4abcb46e0888288BbB129d4A06F3F3D5aC0';

function ContractInteraction() {
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  // Initialize provider and contract
  useEffect(() => {
    if (window.ethereum) {
      const init = async () => {
        try {
          // Connect to MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Provider = getBrowserProvider();
          const signer = await web3Provider.getSigner();
          
          // Create contract instance
          const storageContract = new ethers.Contract(
            getContractAddress(),
            getContractABI(),
            signer
          );
          
          setProvider(web3Provider);
          setContract(storageContract);
          
          // Load initial value
          const value = await storageContract.retrieve();
          setCurrentValue(value.toString());
        } catch (err) {
          setError('Failed to connect to MetaMask');
          console.log(err)
        }
      };
      init();
    } else {
      setError('Please install MetaMask!');
    }
  }, []);

  // Handle store function
  const handleStore = async (e) => {
    e.preventDefault();
    if (!contract) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Execute store transaction
      const tx = await contract.store(newValue);
      await tx.wait(); // Wait for transaction confirmation
      
      // Update displayed value
      const updatedValue = await contract.retrieve();
      setCurrentValue(updatedValue.toString());
      setNewValue('');
    } catch (err) {
      setError(err.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contract-interaction">
      <h2>Storage Contract</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="current-value">
        Current Stored Value: {currentValue}
      </div>

      <form onSubmit={handleStore}>
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Enter new value"
          disabled={loading || !contract}
        />
        <button 
          type="submit" 
          disabled={loading || !contract}
        >
          {loading ? 'Storing...' : 'Store Value'}
        </button>
      </form>
    </div>
  );
}

export default ContractInteraction;