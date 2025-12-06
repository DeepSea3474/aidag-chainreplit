import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

// Dil dosyalarını içe aktar
import en from '../locales/en.json';
import tr from '../locales/tr.json';
import de from '../locales/de.json';
import fr from '../locales/fr.json';
import ar from '../locales/ar.json';
import ru from '../locales/ru.json';
import es from '../locales/es.json';
import zh from '../locales/zh.json';

const locales = { en, tr, de, fr, ar, ru, es, zh };

export default function AIChatbot() {
  const router = useRouter();
  const { locale } = router;

  // Seçili dil dosyasını al
  const translations = locales[locale] || locales.en;

  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    // Örnek: ilk mesajı yükle
    addMessage(translations.welcome || "Welcome to AIChatbot");
  }, [addMessage, translations]);

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-2">
        {translations.title || "AI Chatbot"}
      </h2>
      <ul className="space-y-2">
        {messages.map((m, i) => (
          <li key={i} className="p-2 bg-gray-100 rounded">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
