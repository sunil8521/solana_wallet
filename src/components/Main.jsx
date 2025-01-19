import React from "react";
import ContextAccesser from "../context/ContextAccesser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {Layout} from "./Shared/Layout"
const Main = () => {
  const { setCurrentPage, Create, loading } = ContextAccesser();

  const CreateWallet = async () => {
    const success = await Create(); // Wait for the Create function
    if (success) {
      setCurrentPage("details"); // Navigate only on success
    }
  };
  return (
    <Layout >
    <div className="flex h-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Create Solana Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" disabled={loading} onClick={CreateWallet}>
            Create New Wallet
          </Button>
          <Button variant="outline" className="w-full" disabled={loading} onClick={()=>{setCurrentPage("wallet")}}>
            Recover Existing Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
     </Layout>
  );
};

export default Main;
