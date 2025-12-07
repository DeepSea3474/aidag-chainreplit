"use client";

export default function InfoPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Token Information</h1>

      <p><strong>Official Contract Address:</strong></p>
      <code>0xe6B06f7C63F6AC84729007ae8910010F6E721041</code>

      <p><strong>DAO Wallet Address:</strong></p>
      <code>0xC16eC985D98Db96DE104Bf1e39E1F2Fdb9a712E9</code>

      <p>
        These are the sealed addresses for Aidag Chain.  
        All token transfers and sales are handled transparently through these contracts.
      </p>
    </main>
  );
}
