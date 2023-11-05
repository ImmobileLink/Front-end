import { Labels } from "@/app/i18n/dictionaries/types";
import { CorretorCarouselItem } from "../../../../../lib/modelos";
import UserCarouselItem from "./UserCarouselItem";

interface UserCarouselProps {
  data: CorretorCarouselItem[] | null;
  dict: Labels;
  userId: string;
}

export default async function UserCarousel({ data, dict, userId }: UserCarouselProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className='w-fit flex mt-2 gap-2'>
        {
          data &&
          data?.map((item, index) => {
            if (item.id != userId) {
              return (
                <UserCarouselItem key={index} corretor={item} dict={dict} />
              )
            }
          })
        }
      </div>
    </div>
  );
}