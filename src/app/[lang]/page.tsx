"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PageProps {
  params: {
    lang: string;
  };
}

export default function Page({ params: { lang } }: PageProps) {
  const router = useRouter();
  useEffect(()=>{
    router.push(`${lang}/home`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>;
}
