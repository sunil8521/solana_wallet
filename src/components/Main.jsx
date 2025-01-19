import React from "react";
import ContextAccesser from "../context/ContextAccesser"

const Main = () => {
  const {  setCurrentPage ,Create,loading} = ContextAccesser();

  const CreateWallet =async () => {
      const success = await Create(); // Wait for the Create function
      if (success) {
        setCurrentPage("details"); // Navigate only on success
      }
    
  };
  return (
    <div className="flex min-h-screen flex-col">
    {/* Layout component replacement */}
    <header className="hidden"></header>
    <main className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm border rounded-md shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-center text-lg font-bold">Create Solana Wallet</h1>
        </div>
        <div className="p-4 space-y-4">
          <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Create New Wallet
          </button>
          <button className="w-full px-4 py-2 border rounded-md hover:bg-gray-100">
            Recover Existing Wallet
          </button>
        </div>
      </div>
    </main>
  </div>
  );
};

export default Main;
