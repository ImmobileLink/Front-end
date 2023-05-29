import Image from "next/image";
import ImmobileLogo from "@/app/[lang]/(components)/ImmobileLogo";
import SupabaseAuth from "./SupabaseAuth";
import { getDictionary } from "../dictionaries";

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang); // pt
  return (
    <>
      <div className="flex w-screen h-screen bg-branco dark:bg-escuro2 overflow-x-hidden">
        <div className="flex w-7/12 h-fit flex-1 flex-col m-auto justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <ImmobileLogo />
          </div>

          <div className="mt-10 h-max">
            <SupabaseAuth auth={dict.auth} />
          </div>
        </div>
        <div className="hidden lg:block rounded-s-giga overflow-hidden">
          <Image
            src="assets/login/bg1.jpg"
            alt="Casa"
            width={1}
            height={1}
            className="w-full h-screen"
          />
        </div>
      </div>
    </>
  );
}
