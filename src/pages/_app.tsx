import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../lib/database.types";

import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

import { useState } from "react";

export default function App({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const supabaseClient = createBrowserSupabaseClient<Database>();

  ///console.log("APP -> \n", supabaseClient);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionContextProvider>
  );
}
