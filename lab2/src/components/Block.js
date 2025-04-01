import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlchemyProvider } from "../utils"

function Block() {
  const { id } = useParams();
  const [block, setBlock] = useState(null);

  useEffect(() => {
    const fetchBlockData = async () => {
      const provider = getAlchemyProvider();
      const blockData = await provider.getBlockWithTransactions(parseInt(id));
      setBlock(blockData);
    };

    fetchBlockData();
  }, [id]);

  return (
    <div>
      {block ? (
        <>
          <h1>Block #{block.number}</h1>
          <p>Hash: {block.hash}</p>
          {/* Display other block details */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Block;