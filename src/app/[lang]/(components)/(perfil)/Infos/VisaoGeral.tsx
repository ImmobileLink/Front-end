import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import { cookies } from "next/headers";

interface VisaoGeralProps {
  corretor: any;
}

export default async function VisaoGeral({ corretor }: VisaoGeralProps) {
  const supabase = createServerComponentClient<Database>({ cookies })

  let { data: especialidades } = await supabase
    .rpc('obterespecialidade', {
      idcorretor: corretor.id
    })
  console.log(especialidades)

  return (
    <>
      <p>{`Creci ${corretor.creci}`}</p>
      <div>
        {especialidades?.map((item, index) => (
          <p key={index}>{item.descricao}</p>
        ))}
      </div>
    </>
  );
}
