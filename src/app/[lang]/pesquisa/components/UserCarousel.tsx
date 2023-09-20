import { Labels } from "@/app/i18n/dictionaries/types";
import { CorretorBuscado } from "../../../../../lib/modelos";
import UserCarouselItem from "./UserCarouselItem";

interface UserCarouselProps {
  data: CorretorBuscado;
  dict: Labels;
}

export default async function UserCarousel({ data, dict }: UserCarouselProps) {
  return (
    <div className="w-full overflow-x-scroll">
      <div className='w-fit flex mt-2 gap-2'>
        {
          data?.map(item => {
            return (
              <UserCarouselItem corretor={item} dict={dict}/>
            )
          })
        }
      </div>
    </div>
  );
}