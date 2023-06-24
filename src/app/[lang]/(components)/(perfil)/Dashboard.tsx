import Line from "./Dashboard/Line"
import PolarArea from "./Dashboard/PolarArea"


interface DashboardProps {
  userId: string;
  premium: boolean;
}



export default function Dashboard({ userId, premium }: DashboardProps) {

  let style = ""

  if (!premium) {
     //style = 'blur-sm'
  }

  return (
    <div className={style}>
      
      <div >
        <PolarArea />
      </div>

      <div className="mt-5">
        <Line />
      </div>

    </div>
  );
}
