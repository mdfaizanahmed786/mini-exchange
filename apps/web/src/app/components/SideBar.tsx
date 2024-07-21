import Link from 'next/link';
import React from 'react';
import { FaHome, FaExchangeAlt, FaMoneyCheckAlt } from 'react-icons/fa';

function Sidebar () {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-3xl font-bold">My App</h1>
      </div>
      <div className="flex flex-col flex-grow">
        <Link href={'/dashboard/home'} className="flex items-center p-4 hover:bg-gray-700">
          <FaHome className="mr-4" />
          Home
        </Link>
        <Link  href={'/dashboard/transfer'} className="flex items-center p-4 hover:bg-gray-700">
          <FaExchangeAlt className="mr-4" />
          Transfer
        </Link>
        <Link href={'/dashboard/peer-to-peer'} className="flex items-center p-4 hover:bg-gray-700">
          <FaMoneyCheckAlt className="mr-4" />
          Peer to Peer
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
