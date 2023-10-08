
"use client"
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface RootLayout {
  children: ReactNode;
}

export default function ProviderProfile({ children }: RootLayout) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
    </>
  );
}
