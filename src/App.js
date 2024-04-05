import { useState } from "react";
const { Web3 } = require('web3');
const web3 = new Web3(window.phantom.ethereum);

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  const connectPhantom = async () => {
    if (window.phantom.ethereum !== "undefined") {
      // either we create instance via web3 1st method or we do directly by below method
      // const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
      await window.phantom.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const bal = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(bal, "ether"));
      window.ethereum.on('accountsChanged', async (newAccounts) => {
        setAccount(newAccounts[0]);
        const bal = await web3.eth.getBalance(newAccounts[0]);
        setBalance(web3.utils.fromWei(bal, "ether"));
      });
    }
  }

  return (
    <div className="App">
      <button onClick={connectPhantom}>Connect To Phantom Wallet</button>
      <p>Account Address:{account}</p>
      <p>Balance:{balance}</p>
    </div>
  );
}

export default App;
