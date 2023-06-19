"use client";
import Image from "next/image";
import Avatar from "../(components)/Avatar"
import Dashboard from "../(components)/(perfil)/Dashboard"
import Calendario from "../(components)/(perfil)/Calendario"
import Cabecalho from "../(components)/(perfil)/Cabecalho"


interface pageProps {
  userId: any;
}

export default function page({ userId }: pageProps) {
  return (
    <>
      <div className="bg-escuro2 overflow-x-hidden box-border text-black">
        <div className="h-screen w-screen">
          <div className="flex relative max-w-6xl mx-auto px-4 mt-4">

            <Cabecalho />

            <div className="w-1/3 ">
              <div className="bg-branco rounded-md h-96 p-3">
                <Dashboard userId={123} />
              </div>

              <div className="bg-branco rounded-md mt-3 p-3">
                <Calendario />
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
