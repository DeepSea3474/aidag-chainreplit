import "./globals.css";
export const metadata = {
  title: "Aidag Site",
  description: "Official Aidag Chain website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
