import RecoveryForm from "./RecoveryForm";
import ImmobileLogo from "@/app/[lang]/(components)/ImmobileLogo";

interface pageProps {}

export default async function page({}: pageProps) {
  return (
    <>
      <div className="flex w-screen h-screen bg-branco dark:bg-dark-200">
        <div className="flex w-7/12 h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <ImmobileLogo />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <RecoveryForm />
          </div>
        </div>
      </div>
    </>
  );
}
