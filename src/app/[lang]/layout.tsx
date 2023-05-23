import "@/app/globals.css";

import { dir } from "i18next";

import SupabaseProvider from "./SupabaseProvider";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export const metadata = {
  title: "ImmobileLink",
  description: "Generated by create next app",
};

interface RootLayout {
  children: any;
  params: { lang: string };
}

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayout) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html
      lang={lang}
      dir={dir(lang)}
    >
      <body>
        <SupabaseProvider session={session}>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
