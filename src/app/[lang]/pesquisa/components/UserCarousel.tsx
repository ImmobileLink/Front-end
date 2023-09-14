import { CorretorBuscado } from "../../../../../lib/modelos";
import UserCarouselItem from "./UserCarouselItem";

interface UserCarouselProps {
  data: CorretorBuscado;
}


export default async function UserCarousel({ data }: UserCarouselProps) {
  return (
    <div className="w-full overflow-x-scroll">
      <div className='w-fit flex mt-2 gap-4'>
        {
          data?.map(item => {
            return (
              <UserCarouselItem corretor={item}/>
            )
          })
        }
      </div>
    </div>
  );
}