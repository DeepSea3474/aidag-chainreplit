"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xe6B06f7C63F6AC84729007ae8910010F6E721041"; // Resmi Aidag Chain kontrat adresin
const CONTRACT_ABI = [
  {
    type: "function",
    name: "buyToken",
    stateMutability: "payable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: []
  }
];

export default function BuyPage() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // SSR sırasında window.ethereum çağrısı yapılmasın
    setIsClient(true);
  }, []);

  async function handleBuy() {
    try {
      if (!isClient || !window.ethereum) {
        setStatus("MetaMask gerekli!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const userAddress = await signer.getAddress();
      const value = ethers.parseEther(amount);

      const tx = await contract.buyToken(userAddress, value, { value });
      setStatus("İşlem gönderildi: " + tx.hash);

      await tx.wait();
      setStatus("Token satın alındı!");
    } catch (err: any) {
      console.error(err);
      setStatus("Hata: " + err.message);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Buy Aidag Token</h1>
      <input
        type="text"
        placeholder="Miktar (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <button onClick={handleBuy}>Satın Al</button>
      <p>{status}</p>
    </div>
  );
}
