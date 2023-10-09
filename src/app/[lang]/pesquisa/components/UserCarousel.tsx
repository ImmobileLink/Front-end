import { Labels } from "@/app/i18n/dictionaries/types";
import { CorretorCarouselItem } from "../../../../../lib/modelos";
import UserCarouselItem from "./UserCarouselItem";

interface UserCarouselProps {
  data: CorretorCarouselItem[] | null;
  dict: Labels;
}

export default async function UserCarousel({ data, dict }: UserCarouselProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className='w-fit flex mt-2 gap-2'>
        {
          data?.map((item, index) => {
            return (
              <UserCarouselItem key={index} corretor={item} dict={dict}/>
            )
          })
        }
      </div>
    </div>
  );
}