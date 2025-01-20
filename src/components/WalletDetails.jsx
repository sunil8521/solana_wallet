import { Copy, EyeIcon, RotateCw, Trash2Icon, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ContextAccesser from "../context/ContextAccesser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, RefreshCw, Send } from "lucide-react";
import { Layout } from "./Shared/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WalletDetails() {
  const { walletData, setWalletData, setCurrentPage } = ContextAccesser();

  localStorage.setItem("Info", JSON.stringify(walletData));
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

  const handleNetworkChange = (value) => {
    setNetwork(value);
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
    localStorage.removeItem("Info");
    setCurrentPage("main");
    toast.success("Wallet deleted!");
  };

  const selectedWallet = walletData?.key[selectedWalletIndex];
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API}/api/fetch-balance`, {
      method: "POST",
      headers: {
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
        toast.error("Unable to load balance");
      })
      .then(() => {
        setLoading(false);
      });
  }, [selectedWallet, network]);

  return (
    <Layout>
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Seed Phrase Section */}

        <Card>
          <CardHeader>
            <CardTitle>Recovery Phrase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Mnemonic</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                >
                  {showPrivateKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Input
                type={showPrivateKey ? "text" : "password"}
                readOnly
                value={walletData?.phrase}
              />
            </div>
          </CardContent>
        </Card>

        {/* Header with Add/Delete Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <Select
              defaultValue={network}
              onValueChange={(value) => handleNetworkChange(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mainnet">Mainnet</SelectItem>
                <SelectItem value="devnet">Devnet</SelectItem>
              </SelectContent>
            </Select>

            {/*select wallet*/}
            <Select
              value={selectedWalletIndex}
              onValueChange={(value) => setSelectedWalletIndex(Number(value))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select wallet" />
              </SelectTrigger>
              <SelectContent>
                {walletData?.key.map((wallet, index) => (
                  <SelectItem key={index} value={index}>
                    Wallet {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="outline" onClick={deleteWallet}>
              <Trash2Icon className="text-red-600" />
            </Button>
            <Button onClick={addWallet} variant="outline">
              Add Wallet
            </Button>
          </div>
        </div>
        {/* Selected Wallet Details */}
        {selectedWallet && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Balance</span>
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">
                {loading ? (
    <Loader className="animate-spin w-6 h-8 text-gray-500" />
  ) : (
    `${balance} SOL`
  )}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Receive
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wallet Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Public Key</label>
                  <Input readOnly value={selectedWallet.public} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Private Key</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPrivateKey(!showPrivateKey)}
                    >
                      {showPrivateKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Input
                    type={showPrivateKey ? "text" : "password"}
                    readOnly
                    value={selectedWallet.private}
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
