import React, { useEffect, useState } from 'react';
import { getAlchemyProvider } from '../utils';

function Home() {
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      const provider = getAlchemyProvider();
      const latestBlockNumber = await provider.getBlockNumber();
      
      const blocks = [];
      for (let i = 0; i < 10; i++) {
        const block = await provider.getBlock(latestBlockNumber - i);
        blocks.push(block);
      }
      setLatestBlocks(blocks);

      const transactions = blocks.flatMap(block => block.transactions);
      setLatestTransactions(transactions.slice(0, 10));
    };

    fetchBlockchainData();
  }, []);

  return (
    <div>
      <h1>Sepolia Block Explorer</h1>
      <h2>Latest Blocks</h2>
      <ul>
        {latestBlocks.map(block => (
          <li key={block.number}>Block #{block.number}</li>
        ))}
      </ul>
      <h2>Latest Transactions</h2>
      <ul>
        {latestTransactions.map(tx => (
          <li key={tx}>{tx}</li>
        ))}
      </ul>
    </div>
  );
}
export default Home;