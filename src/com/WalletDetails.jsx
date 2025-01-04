import { useState } from 'react'
import { EyeIcon, SendIcon, DownloadIcon, Trash2Icon,Copy } from 'lucide-react'

export default function WalletDetails() {
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  
  const seedPhrase = "half gift heavy gadget test gun glue nation noise arena pretty force"
  const publicKey = "8tLs6kzg1xZPrWtlj9Pko5qu9QB5GqBhEZnj9uS1feyg"
  const privateKey = "8tLs6kzg1xZPrWtlj9Pko5qu9QB5GqBhEZnj9uS1feyg"
  const balance = "1,234.56 SOL"
  const [network, setNetwork] = useState("devnet");
  const handleCopy = () => {
    navigator.clipboard
      .writeText(seedPhrase)
      .then(() => {
        // toast.success("Phrase copied to clipboard!");
      })
      .catch((err) => {
        // toast.error("Failed to copy text: ", err);
      });
  };
  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Seed Phrase in 2 columns */}
        <div className=" p-4 rounded-lg flex justify-between items-center">
          <p className="font-mono text-sm break-words">
            {seedPhrase?.split(" ").map((w, i) => {
              return (
                <span
                  className="mr-1 inline-block p-2 text-black bg-neutral-300 dark:text-white dark:bg-neutral-900 rounded-xl"
                  key={i}
                >
                  {w}
                </span>
              );
            })}
          </p>
          <button onClick={handleCopy}>
            <Copy />
          </button>
        </div>

        {/* Header with Add/Delete Buttons */}
        <div className="flex items-center justify-between">


<div className='flex gap-6'>

          <h1 className="text-4xl font-bold">solana Wallet</h1>
          <select
          value={network}
          onChange={handleNetworkChange}
          className="font-semibold bg-white border outline-none rounded px-1 py-2 text-black hover:bg-gray-100"
          >
          <option value="mainnet-beta">Mainnet</option>
          <option value="devnet">Devnet</option>
          <option value="testnet">Testnet</option>
        </select>
          </div>



          <div className="flex gap-3">
            <button 
              className= " rounded-md font-semibold px-4 py-2 bg-white text-black hover:bg-gray-200"
            >
              Add Wallet
            </button>
            <button 
              className="bg-white py-2 px-2 rounded-md text-red-500 hover:bg-red-500/10"
            >
              <Trash2Icon className="h-5 w-5" />
            </button>
          </div>


        </div>

        {/* Wallet Details */}
        <div className="space-y-6 bg-zinc-900 p-6 rounded-lg">
          {/* Balance Section */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-gray-400">Balance</h2>
              <p className="text-2xl font-bold">{balance}</p>
            </div>
            <div className="flex gap-3">
              <button 
                className="bg-zinc-800 py-2 px-2 items-center flex flex-col  rounded-md border-green-500 text-green-500 hover:bg-green-500/10"
              >
                Send
              </button>
              <button 
                className="bg-zinc-800 flex flex-col items-center  py-2 px-2 rounded-md border-blue-500 text-blue-500 hover:bg-blue-500/10"
              >
                Receive
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-gray-400">Public Key</h2>
            <p className="font-mono">{publicKey}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-gray-400">Private Key</h2>
            <div className="flex items-center justify-between">
              <p className="font-mono">
                {showPrivateKey ? privateKey : '•'.repeat(privateKey.length)}
              </p>
              <button
                size="icon"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="text-gray-400"
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

