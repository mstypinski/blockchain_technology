
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ContractInteraction from './components/ContractInteraction';
import Home from './components/Home';
import Events from './components/Events';
import Block from './components/Block';
import Transaction from './components/Transaction';
import Address from './components/Address';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/block/:id" element={<Block />} />
        <Route path="/transaction/:id" element={<Transaction />} />
        <Route path="/address/:id" element={<Address />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contract" element={<ContractInteraction />} />
      </Routes>
    </Router>
  );
}

export default App;
