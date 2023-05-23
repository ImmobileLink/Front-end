import Link from "next/link";
import { getDictionary } from "./dictionaries";

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function Page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang); // pt

  return (
    <>
      <h1>Home</h1>
      <Link href={`/${lang}/feed`}>Feed</Link>
    </>
  );
}
