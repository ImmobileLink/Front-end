import VisaoGeral from "./Infos/VisaoGeral"
import Publicacoes from "./Infos/Publicacoes"

interface InfosProps {
  corretor: any;
}

export default function Infos({corretor}: InfosProps) {
/*   const [overview, setOverview] = useState(true)
  const [publi, setPubli] = useState(false)
  const [style, setStyle] = useState("") */

 
  return (
    <>
      <div className="w-auto bg-white h-48 mt-5 rounded-md m-3 overflow-hidden">
        <div className="flex justify-around items-center border-b-2 font-semibold h-9">
          <button className="w-1/2 h-full text-center border-r-2 hover:bg-slate-100">Visão Geral</button>
          <button className="w-1/2 h-full text-center hover:bg-slate-100">Publicações</button>
        </div>

        <div className="p-3">
            <VisaoGeral corretor={corretor}/>
           {/*  <Publicacoes/> */}
        </div>

      </div>
    </>
  );
}
