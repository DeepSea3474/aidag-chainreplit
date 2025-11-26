function copyContract(){
  const el = document.getElementById('contract');
  navigator.clipboard.writeText(el.textContent);
  alert('Contract address copied!');
}

// Language support
async function setLanguage(lang){
  const res = await fetch(`lang/${lang}.json`);
  const dict = await res.json();
  document.getElementById('title').innerText = dict.title;
  document.getElementById('subtitle').innerText = dict.subtitle;
  document.getElementById('buyBtn').innerText = dict.buyBtn;
  document.getElementById('daoBtn').innerText = dict.daoBtn;
  document.getElementById('walletsBtn').innerText = dict.walletsBtn;
  document.getElementById('contractTitle').innerText = dict.contractTitle;
}

// Wallet connection
async function connectWallet(provider){
  if(provider === 'metamask'){
    if(window.ethereum){
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        alert('Metamask wallet connected!');
      } catch (err) {
        alert('Connection failed: ' + err.message);
      }
    } else {
      alert('Metamask not detected. Please install it.');
    }
  }
}

