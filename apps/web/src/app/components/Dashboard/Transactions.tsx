"use client"
import React, { useState, useTransition } from 'react';
import { addMoney } from '../../actions/addMoney';

const DashboardContainer = () => {
  const [amount, setAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState('');
 const [isPending, startTransition]=useTransition()
  // Sample data for balances and transactions (replace with actual data from backend)
  const balances = {
    unlock: 5000,
    lock: 2000,
    total: 7000
  };

  const transactions = [
    { id: 1, amount: 1000, status: 'pending', date: '2024-07-20' },
    { id: 2, amount: 500, status: 'successful', date: '2024-07-19' },
    { id: 3, amount: 200, status: 'failure', date: '2024-07-18' },
  ];

  const handleAddMoney = async () => {
    // Add your logic here to handle the money addition
    startTransition(async ()=>{
        const transaction = await addMoney(amount, selectedBank);
        console.log(transaction)

    })
   
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Balance</h2>
          <div className="space-y-2">
            <p>Unlock Balance: ${balances.unlock}</p>
            <p>Lock Balance: ${balances.lock}</p>
            <p className="font-bold">Total Balance: ${balances.total}</p>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center">
                <span>${transaction.amount}</span>
                <span className={`capitalize ${
                  transaction.status === 'successful' ? 'text-green-500' :
                  transaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {transaction.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Money Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-center">Add Money</h2>
          
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2 font-medium">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="w-full p-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="bank" className="block mb-2 font-medium">
              Bank
            </label>
            <select
              id="bank"
              className="w-full p-2 border rounded"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Select a bank</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>
          
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={handleAddMoney}
          >
            {isPending ? 'Adding Money...' : 'Add Money'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;