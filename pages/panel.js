
import panelData from "../public/panel.json";

export default function Panel() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{panelData.panel_name}</h1>
      <p>Bu sayfa, Yönetim Panelinin ana yapısını, JSON dosyasından dinamik olarak çekmektedir.</p>
      
      <div style={{ marginTop: "30px", border: "1px solid #ccc", padding: "15px" }}>
        <h2>Panel Durumu</h2>
        <p><strong>Versiyon:</strong> {panelData.version}</p>
        <p><strong>Erişim Yetkisi:</strong> {panelData.admin_access.toUpperCase()}</p>
        <p><strong>Aktif Kullanıcı:</strong> {panelData.active_users}</p>
        <p><strong>Son Güncelleme:</strong> {panelData.last_update}</p>
      </div>
    </div>
  );
}

