import { Planos, Signup5 } from "@/app/i18n/dictionaries/types";

interface PlanoCardProps {
  role: string;
  premium: boolean;
  card: Signup5;
  sub: Planos;
}

export default async function PlanoCard({
  role,
  premium,
  card,
  sub,
}: PlanoCardProps) {

  switch (role) {
    case "corretor":
      return (
        <>
          <div className="p-4 bg-white rounded-lg shadow-lg w-10/12 md:w-72 dark:bg-dark-400 ring-1 ring-neutral-700 self-center">
            <p className="pt-4 text-2xl font-extrabold leading-normal text-center text-transparent bg-clip-text bg-gradient-to-bl from-orange-200 to-orange-500">
              {premium ? "PREMIUM" : "FREE"}
            </p>
            <p className="pb-4 text-4xl font-bold leading-normal text-center text-black font-inter dark:text-white">
              <span className="text-base font-medium leading-loose text-center text-black uppercase font-inter dark:text-white">
                R$
              </span>
              {premium ? "50" : "0"}
              <span className="text-sm font-bold leading-tight text-center text-black opacity-50 font-inter dark:text-white">
                {"/" + sub.broker + "/" + sub.month}
              </span>
            </p>
            <ul>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
                {premium ? card.corretor.premiumdescription1 : card.corretor.freedescription1}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
              {premium ? card.corretor.premiumdescription2 : card.corretor.freedescription2}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
              {premium ? card.corretor.premiumdescription3 : card.corretor.freedescription3}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
              {premium ? card.corretor.premiumdescription4 : card.corretor.freedescription4}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
                Lorem ipsum
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
                Lorem ipsum
              </li>
            </ul>
            <div className="py-4 text-center">
              <button
                type="button"
                className="py-2 px-4  bg-secundaria-100 hover:bg-secundaria-200 focus:ring-blue-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                {sub.tryforfree}
              </button>
            </div>
          </div>
        </>
      );
    case "corporacao":
      return (
        <>
          <div className="p-4 bg-white rounded-lg shadow-lg w-10/12 md:w-72 dark:bg-dark-400 ring-1 ring-neutral-700 self-center">
            <p className="pt-4 text-2xl font-extrabold leading-normal text-center text-transparent bg-clip-text bg-gradient-to-bl from-orange-200 to-orange-500">
              {premium ? "PREMIUM" : "FREE"}
            </p>
            <p className="pb-4 text-4xl font-bold leading-normal text-center text-black font-inter dark:text-white">
              <span className="text-base font-medium leading-loose text-center text-black uppercase font-inter dark:text-white">
                R$
              </span>
              {premium ? "240" : "0"}
              <span className="text-sm font-bold leading-tight text-center text-black opacity-50 font-inter dark:text-white">
                {"/" + sub.company + "/" + sub.month}
              </span>
            </p>
            <ul>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
                {premium ? card.company.premiumdescription1 : card.company.freedescription1}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
              {premium ? card.company.premiumdescription2 : card.company.freedescription2}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
              {premium ? card.company.premiumdescription3 : card.company.freedescription3}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
              {premium ? card.company.premiumdescription4 : card.company.freedescription4}
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
                Lorem ipsum
              </li>
              <li className="py-4 text-xs font-medium leading-normal text-center text-black border-t border-gray-300 font-inter dark:text-white">
                Lorem ipsum
              </li>
            </ul>
            <div className="py-4 text-center">
              <button
                type="button"
                className="py-2 px-4  bg-secundaria-100 hover:bg-secundaria-200 focus:ring-blue-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                {sub.tryforfree}
              </button>
            </div>
          </div>
        </>
      );

    default:
      break;
  }
}
