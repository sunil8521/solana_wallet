import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";


export const contextVal=createContext(null);



export const ContextProvider=({children})=>{
    const [phrase, setPhrases] = useState("");
  const [currentPage, setCurrentPage] = useState("main");
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("Info");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setWalletData(parsedData);
      setCurrentPage("details");
    }
  }, []);

  const Create = async () => {
    const toastId = toast.loading("Generating/recovering wallet...");
    try {
      setLoading(true); // Set loading to true before starting the API call
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/generate-key`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coinType: 501,
            phrase: phrase,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to generate/recover wallet.");
      }

      setWalletData({ phrase: data.phares, key: [data.key] });
      toast.success("Wallet successfully generated/recovered!",{id:toastId})


      return true; // Indicate success
    } catch (error) {
      toast.error(error.message || "Failed to generate/recover wallet.",{id:toastId});
      setWalletData(null);
      return false; // Indicate failure
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };



    return(
        <contextVal.Provider value={{walletData,setWalletData,setCurrentPage,Create,setPhrases,currentPage,loading}}>
            {children}


        </contextVal.Provider>
    )
}