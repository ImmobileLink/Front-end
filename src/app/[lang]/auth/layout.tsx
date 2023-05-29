"use client";
import { ThemeProvider } from "next-themes";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <section>{children}</section>
    </ThemeProvider>
  );
}
