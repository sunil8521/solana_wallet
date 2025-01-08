import Wallet from "./com/Wallet";
import WalletDetails from "./com/WalletDetails";
import Main from "./com/Main";
import { useState } from "react";
import { toast } from "sonner";
function App() {
  const [phrase, setPhrases] = useState("");
  const [currentPage, setCurrentPage] = useState("main");
  const [loading,setLoading]=useState(false)
  const [walletData, setWalletData] = useState(null);
  const Create = async () => {
    try {
      setLoading(true); // Set loading to true before starting the API call
      const response = await fetch("http://localhost:4000/api/generate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coinType: 501,
          phrase: phrase,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to generate/recover wallet.");
      }

      setWalletData({ phrase: data.phares, key: [data.key] });
      toast.success("Wallet successfully generated/recovered!");
      return true; // Indicate success
    } catch (error) {
      toast.error(error.message || "Failed to generate/recover wallet.");
      setWalletData(null);
      return false; // Indicate failure
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const isLocalStorage = false;

  return (
    <>
      {currentPage === "main" && <Main Create={Create} loading={loading} setCurrentPage={setCurrentPage} />}
      {currentPage === "wallet" && <Wallet setPhrases={setPhrases} setCurrentPage={setCurrentPage} />}
      {currentPage === "details" && <WalletDetails walletData={walletData} setWalletData={setWalletData} />}
    </>
  );
}

export default App;
