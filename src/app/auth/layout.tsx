import SupabaseProvider from "../supabase-provider";

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
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}