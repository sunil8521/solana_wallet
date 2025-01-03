

function App() {
let wallet=true
  return (
    <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Ethereum Wallet Generator</h1>
        <div className="space-y-4">
          <button
            // onClick={generateWallet}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Generate Wallet
          </button>
          {wallet && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Public Key (Address):</label>
                <p className="text-sm bg-gray-100 p-2 rounded">{wallet.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Private Key:</label>
                <p className="text-sm bg-gray-100 p-2 rounded">{wallet.privateKey}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {/* Balance: {balance !== null ? `${balance} ETH` : "N/A"} */}
                </span>
                <button
                  // onClick={fetchBalance}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md flex items-center space-x-2"
                >
                  <span>Refresh</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 20.25a9 9 0 110-16.5m0 0V7.5m0 0h3m9-1.5a9 9 0 110 16.5m0 0v-3m0 3h-3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default App