import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "CentralPrint",
  description: "Sistema de Gestão de Impressoras",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
