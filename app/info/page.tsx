"use client";

import dynamic from "next/dynamic";

function InfoPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Aidag Chain Info</h1>
      <p>Resmi kontrat adresi: 0xe6B06f7C63F6AC84729007ae8910010F6E721041</p>
      <p>DAO cüzdan adresi: [buraya DAO adresini ekle]</p>
      <p>Bu sayfa sadece bilgilendirme amaçlıdır. Token satın almak için <strong>Buy Aidag Token</strong> sayfasını kullanın.</p>
    </div>
  );
}

// SSR tamamen kapatıldı → sadece client tarafında render
export default dynamic(() => Promise.resolve(InfoPage), { ssr: false });
