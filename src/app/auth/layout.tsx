"use client";
import SupabaseProvider from "../supabase-provider";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Entrar - ImmobileLink",
  description: "A rede social do corretor imobiliario",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <SupabaseProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
