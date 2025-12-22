import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header>
        <Image src="/logo.png" alt="Aidag Logo" width={120} height={120} />
        <nav>
          <a href="/panel">Panel</a> | <a href="/dao">DAO</a>
        </nav>
      </header>
      <main>
        <h1>Aidag Site</h1>
        <p>Hoş geldiniz! Bu sayfa Next.js ile oluşturuldu.</p>
        <button onClick={() => alert("Butona tıkladınız!")}>Buton Örneği</button>
      </main>
    </div>
  );
}
