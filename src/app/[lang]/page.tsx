"use client";

import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    lang: string;
  };
}

export default function Page({ params: { lang } }: PageProps) {
  const router = useRouter();
  router.push(`${lang}/feed`);

  return <></>;
}
