import { Copy, EyeIcon, RotateCw, Trash2Icon,Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WalletDetails({ walletData, setWalletData }) {
  localStorage.setItem("Info",JSON.stringify(walletData))
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [network, setNetwork] = useState("devnet");
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(walletData.phrase)
      .then(() => toast.success("Phrase copied to clipboard!"))
      .catch(() => toast.error("Failed to copy text."));
  };

  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };

  const addWallet = () => {
    fetch(`${import.meta.env.VITE_API}/api/create-new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coinType: 501,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedWallets = [...walletData.key, data.key];
        setWalletData({ ...walletData, key: updatedWallets });
        setSelectedWalletIndex(updatedWallets.length - 1); // Automatically select new wallet
        toast.success("New wallet added!");
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const deleteWallet = () => {
    const updatedWallets = walletData.key.filter(
      (_, index) => index !== selectedWalletIndex
    );
    setWalletData({ ...walletData, key: updatedWallets });
    setSelectedWalletIndex(0); // Reset to the first wallet
    toast.success("Wallet deleted!");
  };

  const selectedWallet = walletData?.key[selectedWalletIndex];
  const [balance,setBalance]=useState(null);
  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API}/api/fetch-balance`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stage: network,
        adsress: selectedWallet.public,
      }),
    })
      .then((d) => d.json())
      .then((res) => {
        setBalance(res.amount);
        
      })
      .catch((er) => {
        toast.error("Unable to load balance")
      }).then(()=>{setLoading(false)});
  }, [selectedWallet, network]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Seed Phrase Section */}
        <div className="p-4 rounded-lg flex justify-between items-center">
          <p className="font-mono text-sm break-words">
            {walletData?.phrase.split(" ").map((w, i) => (
              <span
                className="mr-1 inline-block p-2 text-black bg-neutral-300 dark:text-white dark:bg-neutral-900 rounded-xl"
                key={i}
              >
                {w}
              </span>
            ))}
          </p>
          <button onClick={handleCopy}>
            <Copy />
          </button>
        </div>

        {/* Header with Add/Delete Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <h1 className="text-4xl font-bold">Solana Wallet</h1>
            <select
              value={network}
              onChange={handleNetworkChange}
              className="font-semibold bg-white border outline-none rounded px-1 py-2 text-black hover:bg-gray-100"
            >
              <option value="mainnet">Mainnet</option>
              <option value="devnet">Devnet</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={addWallet}
              className="rounded-md font-semibold px-4 py-2 bg-white text-black hover:bg-gray-200"
            >
              Add Wallet
            </button>
            <button
              onClick={deleteWallet}
              className="bg-white py-2 px-2 rounded-md text-red-500 hover:bg-red-500/10"
            >
              <Trash2Icon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Wallet Dropdown */}
        <div>
          <label className="block text-gray-400 mb-2">Select Wallet</label>
          <select
            value={selectedWalletIndex}
            onChange={(e) => setSelectedWalletIndex(Number(e.target.value))}
            className=" bg-white text-black rounded-md p-2"
          >
            {walletData?.key.map((wallet, index) => (
              <option key={index} value={index}>
                Wallet {index + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Wallet Details */}
        {selectedWallet && (
          <div className="space-y-6 bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-gray-400">Balance</h2>
                <div className="flex items-center">
                  <p className="text-2xl mr-1 font-bold">{loading?<Loader />:`${balance} SOL`}</p>
                  <button>
                    <RotateCw className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-zinc-800 py-2 px-2 items-center flex flex-col rounded-md border-green-500 text-green-500 hover:bg-green-500/10">
                  Send
                </button>
                <a
                  href="https://faucet.solana.com/"
                  target="_blank"
                  className="bg-zinc-800 flex flex-col items-center py-2 px-2 rounded-md border-blue-500 text-blue-500 hover:bg-blue-500/10"
                >
                  Receive
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-gray-400">Public Key</h2>
              <p className="font-mono">{selectedWallet.public}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-gray-400">Private Key</h2>
              <div className="flex items-center justify-between">
                <p className="font-mono">
                  {showPrivateKey
                    ? selectedWallet.private
                    : "•".repeat(selectedWallet.private.length)}
                </p>
                <button
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="text-gray-400"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
