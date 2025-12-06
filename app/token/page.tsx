export default function TokenPage() {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">Aidag Token Info</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Resmi Kontrat Adresi</h2>
        <p className="font-mono bg-gray-100 p-2 rounded">
          0xe6B06f7C63F6AC84729007ae8910010F6E721041
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Resmi Cüzdan Adresi</h2>
        <p className="font-mono bg-gray-100 p-2 rounded">
          0xC16eC985D98Db96DE104Bf1e39E1F2Fdb9a712E9
        </p>
        <p className="text-sm text-gray-600 mt-2">
          (Dao Soulware: Ön satış, Bonus, CEX, DEX likidite cüzdanı)
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tokenomics</h2>
        <ul className="list-disc list-inside">
          <li>Toplam Arz: 1,000,000 AIDAG</li>
          <li>Dağıtım: %50 Satış, %30 Ekip, %20 Topluluk</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Şeffaflık Notu</h2>
        <p>
          Bu adresler Aidag Chain topluluğu için resmi olarak “seal” edilmiştir.
          Herhangi bir değişiklik yapılmayacaktır. Tüm işlemler bu adresler
          üzerinden takip edilebilir.
        </p>
      </section>
    </main>
  );
}
