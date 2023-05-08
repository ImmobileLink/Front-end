import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Link href="/login">Login</Link>
      <br />
      <Link href="/cadastro">Cadastro</Link>
    </>
  );
}
