import Wallet from "./components/Wallet";
import WalletDetails from "./components/WalletDetails";
import Main from "./components/Main";
import ContextAccesser from "./context/ContextAccesser";
function App() {
  const { currentPage } = ContextAccesser();

  return (
    <>
      {currentPage === "main" && <Main />}
      {currentPage === "wallet" && <Wallet />}
      {currentPage === "details" && <WalletDetails />}
    </>
  );
}

export default App;
