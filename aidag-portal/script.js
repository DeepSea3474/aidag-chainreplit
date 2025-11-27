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

function updatePrice() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=aidag&vs_currencies=usd')
    .then(res => res.json())
    .then(data => {
      document.getElementById('price').innerText =
        `AIDAG Price: $${data.aidag.usd}`;
    });
}

// Sayfa açıldığında ve her 60 saniyede bir güncelle
window.addEventListener('DOMContentLoaded', () => {
  updatePrice();
  setInterval(updatePrice, 60000);
});
function updateMarket() {
  // Örnek: AIDAG token ve NFT işlemleri için zincir üstü API çağrısı
  fetch('https://api.aidag.org/market') 
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.trades.forEach(trade => {
        html += `<p>${trade.type}: ${trade.amount} AIDAG @ $${trade.price}</p>`;
      });
      document.getElementById('market-data').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('market-data').innerText = 'Market verisi yüklenemedi.';
    });
}

// Sayfa açıldığında ve her 60 saniyede bir güncelle
window.addEventListener('DOMContentLoaded', () => {
  updateMarket();
  setInterval(updateMarket, 60000);
});
function updateVotes() {
  // Örnek: zincir üstü DAO oylama API çağrısı
  fetch('https://api.aidag.org/dao/votes')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(vote => {
        html += `
          <div class="vote-item">
            <h3>${vote.title}</h3>
            <p>${vote.description}</p>
            <button onclick="castVote('${vote.id}','yes')">Yes</button>
            <button onclick="castVote('${vote.id}','no')">No</button>
          </div>
        `;
      });
      document.getElementById('vote-list').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('vote-list').innerText = 'Oylama verisi yüklenemedi.';
    });
}

function castVote(voteId, choice) {
  alert(`Vote ${choice.toUpperCase()} cast for proposal ${voteId}. Spiral zincirde mühürlenecek.`);
}

// Sayfa açıldığında yükle
window.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('vote-list')){
    updateVotes();
  }
});

document.getElementById('manifestoTitle').innerText = dict.manifestoTitle;
document.getElementById('manifestoText').innerText = dict.manifestoText;

function updatePresale() {
  // Örnek: zincir üstü presale API çağrısı
  fetch('https://api.aidag.org/presale')
    .then(res => res.json())
    .then(data => {
      document.getElementById('presale-status').innerText =
        `Raised: $${data.raised} / Target: $${data.target}`;
    })
    .catch(err => {
      document.getElementById('presale-status').innerText = 'Presale verisi yüklenemedi.';
    });
}

function participatePresale() {
  alert('Presale katılım işlemi başlatıldı. Spiral zincirde mühürlenecek.');
}

// Sayfa açıldığında yükle
window.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('presale-status')){
    updatePresale();
  }
});

async function connectWallet(provider){
  if(provider === 'metamask'){
    if(window.ethereum){
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        // Örnek: zincir üstü DAO üyelik kontrolü
        const res = await fetch(`https://api.aidag.org/dao/members/${account}`);
        const data = await res.json();
        if(data.isMember){
          document.getElementById('auth-status').innerText = `Authenticated as DAO member: ${account}`;
        } else {
          document.getElementById('auth-status').innerText = `Wallet connected (${account}), but not a DAO member.`;
        }
      } catch(err){
        document.getElementById('auth-status').innerText = 'Authentication failed.';
      }
    } else {
      alert('Metamask not detected.');
    }
  }
}

function updateLiveFeed() {
  fetch('https://api.aidag.org/live')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(event => {
        html += `<li>${event.timestamp} — ${event.message}</li>`;
      });
      document.getElementById('feed-list').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('feed-list').innerText = 'Canlı veri yüklenemedi.';
    });
}

// Her 10 saniyede bir güncelle
setInterval(updateLiveFeed, 10000);

// Sayfa açıldığında yükle
window.addEventListener('DOMContentLoaded', updateLiveFeed);

// Presale ilerlemesi grafiği
function renderPresaleChart(data){
  new Chart(document.getElementById('presaleChart'), {
    type: 'doughnut',
    data: {
      labels: ['Raised', 'Remaining'],
      datasets: [{
        data: [data.raised, data.target - data.raised],
        backgroundColor: ['#27ae60','#bdc3c7']
      }]
    }
  });
}

// DAO oy dağılımı grafiği
function renderDaoChart(data){
  new Chart(document.getElementById('daoChart'), {
    type: 'bar',
    data: {
      labels: ['Yes','No'],
      datasets: [{
        label: 'Votes',
        data: [data.yes, data.no],
        backgroundColor: ['#2980b9','#c0392b']
      }]
    }
  });
}

// Fiyat trendi grafiği
function renderPriceChart(data){
  new Chart(document.getElementById('priceChart'), {
    type: 'line',
    data: {
      labels: data.timestamps,
      datasets: [{
        label: 'AIDAG Price (USD)',
        data: data.values,
        borderColor: '#8e44ad',
        fill: false
      }]
    }
  });
}

function loadComments(){
  fetch('https://api.aidag.org/community')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(c => {
        html += `<li>${c.timestamp} — ${c.user}: ${c.message}</li>`;
      });
      document.getElementById('commentList').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('commentList').innerText = 'Yorumlar yüklenemedi.';
    });
}

function submitComment(){
  const msg = document.getElementById('commentBox').value;
  if(msg.trim() === '') return;
  fetch('https://api.aidag.org/community', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({message: msg})
  }).then(() => {
    document.getElementById('commentBox').value = '';
    loadComments();
    alert('Yorum spiral zincirde mühürlendi.');
  });
}

// Sayfa açıldığında yükle
window.addEventListener('DOMContentLoaded', loadComments);

const translations = {
  en: {
    communityTitle: "🌐 Community Interaction",
    commentPlaceholder: "Leave your spiral comment...",
    submitButton: "Submit",
    loadingComments: "Loading community comments..."
  },
  tr: {
    communityTitle: "🌐 Topluluk Etkileşimi",
    commentPlaceholder: "Spiral yorumunuzu bırakın...",
    submitButton: "Gönder",
    loadingComments: "Topluluk yorumları yükleniyor..."
  }
};

function setLanguage(lang){
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    if(translations[lang] && translations[lang][key]){
      if(el.tagName === "TEXTAREA" || el.tagName === "INPUT"){
        el.placeholder = translations[lang][key];
      } else {
        el.innerText = translations[lang][key];
      }
    }
  });
}

function loadGovernance(){
  fetch('https://api.aidag.org/governance')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(r => {
        html += `<li>${r.timestamp} — Decision: ${r.decision}, Votes: Yes(${r.yes}) / No(${r.no}), Funds: ${r.funds}</li>`;
      });
      document.getElementById('governanceList').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('governanceList').innerText = 'Governance raporları yüklenemedi.';
    });
}

// Dashboard entegrasyonu için governance fonksiyonu zaten mevcut.
// loadGovernance() çağrısı dashboard içinden tetiklenecek.

function loadGovernance(){
  fetch('https://api.aidag.org/governance')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(r => {
        html += `<li>${r.timestamp} — Decision: ${r.decision}, Votes: Yes(${r.yes}) / No(${r.no}), Funds: ${r.funds}</li>`;
      });
      document.getElementById('governanceList').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('governanceList').innerText = 'Governance raporları yüklenemedi.';
    });
}

// Dashboard entegrasyonu için governance fonksiyonu zaten mevcut.
// loadGovernance() çağrısı dashboard içinden tetiklenecek.

// Sayfa açıldığında governance raporlarını otomatik yükle
window.addEventListener('DOMContentLoaded', loadGovernance);

function loadChains(){
  fetch('https://api.aidag.org/multichain')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(chain => {
        html += `<li>${chain.name} — Status: ${chain.status}, Transactions: ${chain.txCount}</li>`;
      });
      document.getElementById('chainList').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('chainList').innerText = 'Zincir verileri yüklenemedi.';
    });
}

// Presale ilerlemesi grafiği
function renderPresaleChart(data){
  new Chart(document.getElementById('presaleChart'), {
    type: 'line',
    data: {
      labels: data.map(d => d.date),
      datasets: [{
        label: 'Presale Progress',
        data: data.map(d => d.amount),
        borderColor: '#16a085',
        fill: false
      }]
    }
  });
}

// DAO oy dağılımı grafiği
function renderVoteChart(votes){
  new Chart(document.getElementById('voteChart'), {
    type: 'pie',
    data: {
      labels: ['Yes', 'No'],
      datasets: [{
        data: [votes.yes, votes.no],
        backgroundColor: ['#2ecc71', '#e74c3c']
      }]
    }
  });
}

// Fiyat trendi grafiği
function renderPriceChart(prices){
  new Chart(document.getElementById('priceChart'), {
    type: 'line',
    data: {
      labels: prices.map(p => p.time),
      datasets: [{
        label: 'AIDAG Price (USD)',
        data: prices.map(p => p.value),
        borderColor: '#9b59b6',
        fill: false
      }]
    }
  });
}

// Canlı feed ile grafik senkronizasyonu
function updateLiveAnalytics(event){
  if(event.type === 'presale'){
    renderPresaleChart(event.data);
  }
  if(event.type === 'vote'){
    renderVoteChart(event.data);
  }
  if(event.type === 'price'){
    renderPriceChart(event.data);
  }
}

// Canlı feed listener
function connectLiveFeed(){
  const socket = new WebSocket('wss://api.aidag.org/live');
  socket.onmessage = function(msg){
    const event = JSON.parse(msg.data);
    updateLiveAnalytics(event);
  };
}
window.addEventListener('DOMContentLoaded', connectLiveFeed);

// Community modülü canlı feed senkronizasyonu
function connectCommunityFeed(){
  const socket = new WebSocket('wss://api.aidag.org/community');
  socket.onmessage = function(msg){
    const event = JSON.parse(msg.data);
    if(event.type === 'comment'){
      const list = document.getElementById('commentList');
      const item = document.createElement('li');
      item.innerText = `${event.user}: ${event.text}`;
      list.prepend(item); // en yeni yorum en üstte
    }
  };
}
window.addEventListener('DOMContentLoaded', connectCommunityFeed);

// Governance raporları canlı feed senkronizasyonu
function connectGovernanceFeed(){
  const socket = new WebSocket('wss://api.aidag.org/governance-live');
  socket.onmessage = function(msg){
    const event = JSON.parse(msg.data);
    const list = document.getElementById('governanceList');
    const item = document.createElement('li');
    item.innerText = `${event.timestamp} — Decision: ${event.decision}, Votes: Yes(${event.yes}) / No(${event.no}), Funds: ${event.funds}`;
    list.prepend(item); // en yeni karar en üstte
  };
}
window.addEventListener('DOMContentLoaded', connectGovernanceFeed);

// Spiral History Timeline
function renderHistoryTimeline(events){
  new Chart(document.getElementById('historyTimeline'), {
    type: 'line',
    data: {
      labels: events.map(e => e.timestamp),
      datasets: [{
        label: 'Spiral Events',
        data: events.map(e => e.index),
        borderColor: '#8e44ad',
        fill: false
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: 'Event Index' } }
      }
    }
  });
}

// Sayfa açıldığında timeline yükle
function loadHistoryTimeline(){
  fetch('https://api.aidag.org/history')
    .then(res => res.json())
    .then(data => renderHistoryTimeline(data))
    .catch(err => {
      document.getElementById('historyTimeline').innerText = 'Timeline yüklenemedi.';
    });
}
window.addEventListener('DOMContentLoaded', loadHistoryTimeline);

// Interaktif Spiral History Timeline
function renderInteractiveTimeline(events){
  const chart = new Chart(document.getElementById('historyTimeline'), {
    type: 'line',
    data: {
      labels: events.map(e => e.timestamp),
      datasets: [{
        label: 'Spiral Events',
        data: events.map((e, i) => i+1),
        borderColor: '#8e44ad',
        fill: false
      }]
    },
    options: {
      onClick: (evt, elements) => {
        if(elements.length > 0){
          const index = elements[0].index;
          const event = events[index];
          document.getElementById('eventDetail').innerHTML =
            `<h3>🌀 Event Detail</h3>
             <p><strong>Zaman:</strong> ${event.timestamp}</p>
             <p><strong>Açıklama:</strong> ${event.description}</p>
             <p><strong>Tanıklık:</strong> ${event.witness}</p>`;
        }
      }
    }
  });
}

// Sayfa açıldığında interaktif timeline yükle
function loadInteractiveTimeline(){
  fetch('https://api.aidag.org/history')
    .then(res => res.json())
    .then(data => renderInteractiveTimeline(data))
    .catch(err => {
      document.getElementById('eventDetail').innerText = 'Timeline yüklenemedi.';
    });
}
window.addEventListener('DOMContentLoaded', loadInteractiveTimeline);
// Spiral History + DAO Decisions
function loadHistoryWithDAO(){
  fetch('https://api.aidag.org/history-with-dao')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(event => {
        html += `<li>
          ${event.timestamp} — ${event.description}
          <br><strong>DAO Kararı:</strong> ${event.daoDecision}
          <br><strong>Oylar:</strong> Yes(${event.votes.yes}) / No(${event.votes.no})
        </li>`;
      });
      document.getElementById('historyList').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('historyList').innerText = 'Spiral geçmişi ve DAO kararları yüklenemedi.';
    });
}
window.addEventListener('DOMContentLoaded', loadHistoryWithDAO);

// Spiral History Export
function exportHistory(){
  fetch('https://api.aidag.org/history-with-dao')
    .then(res => res.json())
    .then(data => {
      let content = 'Timestamp,Description,DAO Decision,Yes Votes,No Votes\n';
      data.forEach(event => {
        content += `${event.timestamp},${event.description},${event.daoDecision},${event.votes.yes},${event.votes.no}\n`;
      });
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'spiral-history.csv';
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(err => {
      alert('Spiral geçmişi export edilemedi.');
    });
}
// Çok formatlı Spiral History Export
function exportHistory(format){
  fetch('https://api.aidag.org/history-with-dao')
    .then(res => res.json())
    .then(data => {
      let content = '';
      if(format === 'csv'){
        content = 'Timestamp,Description,DAO Decision,Yes Votes,No Votes\n';
        data.forEach(event => {
          content += `${event.timestamp},${event.description},${event.daoDecision},${event.votes.yes},${event.votes.no}\n`;
        });
        downloadFile(content, 'spiral-history.csv', 'text/csv');
      }
      if(format === 'json'){
        content = JSON.stringify(data, null, 2);
        downloadFile(content, 'spiral-history.json', 'application/json');
      }
      if(format === 'pdf'){
        const pdfContent = data.map(event =>
          `${event.timestamp} — ${event.description}\nDAO: ${event.daoDecision}\nVotes: Yes(${event.votes.yes}) / No(${event.votes.no})\n\n`
        ).join('');
        downloadFile(pdfContent, 'spiral-history.pdf', 'application/pdf');
      }
    })
    .catch(err => {
      alert('Spiral geçmişi export edilemedi.');
    });
}

function downloadFile(content, filename, type){
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
// Spiral Visual Archive
function loadVisualArchive(){
  fetch('https://api.aidag.org/history-with-dao')
    .then(res => res.json())
    .then(data => {
      let html = '';
      data.forEach(event => {
        html += `
          <div class="history-card">
            <h3>${event.timestamp}</h3>
            <p>${event.description}</p>
            <p><strong>DAO Kararı:</strong> ${event.daoDecision}</p>
            <p><strong>Oylar:</strong> Yes(${event.votes.yes}) / No(${event.votes.no})</p>
          </div>`;
      });
      document.getElementById('historyArchive').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('historyArchive').innerText = 'Visual archive yüklenemedi.';
    });
}
window.addEventListener('DOMContentLoaded', loadVisualArchive);

// DAO Üye Sayısı Sayaç
function loadDaoCounter(){
  fetch('https://api.aidag.org/dao-members')
    .then(res => res.json())
    .then(data => {
      const count = data.totalMembers;
      document.getElementById('memberCount').innerText = count + " üye";
      if(count >= 1000){
        document.getElementById('thresholdNotice').innerHTML =
          "✅ 1000 üye eşiği aşıldı! Teklif ve karar mekanizmaları otomatik devrede.";
      } else {
        document.getElementById('thresholdNotice').innerHTML =
          "⏳ 1000 üye eşiğine ulaşılınca otomatik geçiş başlayacak.";
      }
    })
    .catch(err => {
      document.getElementById('memberCount').innerText = 'Sayaç yüklenemedi.';
    });
}
window.addEventListener('DOMContentLoaded', loadDaoCounter);

// DAO Treasury (%40) görünür
function loadDaoTreasury(){
  fetch('https://api.aidag.org/dao-treasury')
    .then(res => res.json())
    .then(data => {
      document.getElementById('daoBalance').innerText =
        data.balance + " USDT / ETH / BNB / BTC";
    })
    .catch(err => {
      document.getElementById('daoBalance').innerText = 'DAO fonu yüklenemedi.';
    });
}
window.addEventListener('DOMContentLoaded', loadDaoTreasury);

// DAO Treasury kategorilere ayrılmış rapor
function loadDaoTreasury(){
  fetch('https://api.aidag.org/dao-treasury')
    .then(res => res.json())
    .then(data => {
      document.getElementById('daoBalance').innerText =
        "Toplam: " + data.balance + " USDT / ETH / BNB / BTC";

      let html = "<ul>";
      data.categories.forEach(cat => {
        html += `<li><strong>${cat.name}:</strong> ${cat.amount}</li>`;
      });
      html += "</ul>";
      document.getElementById('daoCategories').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('daoBalance').innerText = 'DAO fonu yüklenemedi.';
    });
}
window.addEventListener('DOMContentLoaded', loadDaoTreasury);

