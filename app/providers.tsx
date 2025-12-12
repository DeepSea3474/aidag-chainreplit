// app/providers.tsx

'use client'; 

import * as React from 'react';
import { WagmiConfig, createConfig, mainnet, http } from 'wagmi';

// 1. Kullanmak istediğiniz ağları (chains) tanımlayın
const config = createConfig({
  chains: [mainnet], // Başlangıç için sadece Ethereum Mainnet'i kullanıyoruz.
                      // Diğer ağları (polygon, arbitrum vb.) buraya ekleyebilirsiniz.
  transports: {
    [mainnet.id]: http(), 
  },
  // Eğer WalletConnect kullanıyorsanız buraya ek ayarlar gerekebilir:
  // connectors: [
  //   walletConnect({ projectId: 'YOUR_PROJECT_ID' }), 
  //   injected(),
  // ],
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // WagmiProvider, uygulamanızın tüm Web3 etkileşimlerini sağlar
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
}

