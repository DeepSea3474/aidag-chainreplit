// app/providers.tsx

'use client'; 

import * as React from 'react';
import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { http } from 'wagmi/connectors'; // <-- Hata veren 'http' artık buradan geliyor
import { injected } from 'wagmi/connectors'; // Opsiyonel, genellikle Metamask için kullanılır

// 1. Kullanmak istediğiniz ağları (chains) tanımlayın
const config = createConfig({
  // Tüm bağlantıların otomatik olarak denemesini sağlar.
  autoConnect: true, 
  
  // Ana ağları ve transport (RPC) ayarlarını tanımlıyoruz.
  chains: [mainnet], 
  transports: {
    // Ethereum Mainnet için varsayılan HTTP bağlantısını kullanıyoruz.
    [mainnet.id]: http(), 
  },
  
  // Eğer cüzdan bağlantılarını (Metamask, WalletConnect vb.) desteklemek istiyorsanız:
  connectors: [
    injected(),
    // Eğer WalletConnect kullanacaksanız buraya ekleyin: 
    // walletConnect({ projectId: 'YOUR_WALLETCONNECT_PROJECT_ID' }), 
  ],
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Uygulamanın Web3 bağlamını sağlar
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
}

