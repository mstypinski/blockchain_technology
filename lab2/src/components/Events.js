import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getAlchemyProvider, getContractABI, getContractAddress } from "../utils"


function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const provider = getAlchemyProvider();
    const contract = new ethers.Contract(getContractAddress(), getContractABI(), getAlchemyProvider());

    // Real-time event listener
    const onLogEvent = (sender, value, event) => {
      setEvents(prev => [
        {
          blockNumber: event.blockNumber,
          sender: sender,
          value: value.toString(),
          txHash: event.transactionHash
        },
        ...prev
      ]);
    };

    // Historical event query
    const fetchPastEvents = async () => {
      try {
        const filter = contract.filters.Log();
        const pastEvents = await contract.queryFilter(filter, -499); 
        const formattedEvents = pastEvents.map(e => ({
          blockNumber: e.blockNumber,
          sender: e.args.sender,
          value: e.args.value.toString(),
          txHash: e.transactionHash
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching past events:', error);
      }
      setLoading(false);
    };

    // Set up listeners
    contract.on('Log', onLogEvent);
    fetchPastEvents();

    // Cleanup
    return () => {
      contract.off('Log', onLogEvent);
    };
  }, []);

  if (loading) return <div>Loading events...</div>;

  return (
    <div>
      <h2>Storage Contract Events</h2>
      <div>
        {events.map((event, index) => (
          <div key={index}>
            <p>Block: {event.blockNumber}</p>
            <p>Sender: {event.sender}</p>
            <p>Value Stored: {event.value}</p>
            <p>Tx Hash: {event.txHash}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;