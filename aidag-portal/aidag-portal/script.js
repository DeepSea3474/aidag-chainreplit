function setLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('title').innerText = data.title;
      document.getElementById('subtitle').innerText = data.subtitle;
      document.getElementById('buyBtn').innerText = data.buyBtn;
      document.getElementById('daoBtn').innerText = data.daoBtn;
      document.getElementById('walletsBtn').innerText = data.walletsBtn;
      document.getElementById('contractTitle').innerText = data.contractTitle;
    });
}

// Sayfa açıldığında otomatik dil yükleme
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
  setLanguage(savedLang);
});
