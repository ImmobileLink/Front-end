import { Labels } from "@/app/i18n/dictionaries/types";
import UserCarousel from "./UserCarousel";
import { CorretorCarouselItem } from "../../../../../lib/modelos";

interface NearbyUsersProps {
  dict: Labels;
  estado: string;
  carouselUsers: CorretorCarouselItem[] | null;
}

export default async function NearbyUsers({ dict, estado, carouselUsers }: NearbyUsersProps) {

  return (
    <>
      <div className="w-full px-4">
        <span className="text-black dark:text-white text-xl text-start">
          {dict.nearbyusers} <span className="font-bold">
            {/* {_UF_converter[estado![0].estado]} */}
            {estado}
          </span>
        </span>
        <UserCarousel data={carouselUsers} dict={dict}/>
      </div>
    </>
  );
}