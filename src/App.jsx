import Wallet from "./com/Wallet";
import WalletDetails from "./com/WalletDetails";
import Main from "./com/Main";
import { useState } from "react";
import { toast } from "sonner";
function App() {
  const [phrase, setPhrases] = useState("");
  const [currentPage, setCurrentPage] = useState("main");
  
  const [walletData, setWalletData] = useState(null);
const Create=()=>{
  fetch("/api/generate-key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coinType: 501,
      phrase: phrase,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        
          setWalletData(null);
      
        toast.error(data.error);
      } else {
        
          setWalletData({ phares: data.phares, key: [data.key] });
      
        toast.success("Wallet successfully generated/recovered!");
      }

    })
    .catch((error) => {
      toast.error("Failed to generate/recover wallet. Try again.");
    });
}

  const isLocalStorage = false;

  return (
    <>
      {currentPage === "main" && <Main Create={Create} setCurrentPage={setCurrentPage} />}
      {currentPage === "wallet" && <Wallet setPhrases={setPhrases} setCurrentPage={setCurrentPage} />}
      {currentPage === "details" && <WalletDetails />}
    </>
  );
}

export default App;
