"use client";
import Image from "next/image";

interface CabecalhoProps { }

export default function Cabecalho({ }: CabecalhoProps) {
  return (
    <>
      <div className="w-2/3 bg-branco mr-3 rounded-md overflow-hidden h-screen">
        <div className="h-36 overflow-hidden">
          <Image
            className="w-screen"
            src="users/cover/cover.jpg"
            alt="capa"
            width={1}
            height={1}
          />
        </div>

        <div className="absolute top-24 left-10 flex flex-col items-center text-white">
          <div className="w-36 h-36 rounded-full bg-branco flex justify-center items-center">
            <Image
              className=" w-32 h-32 rounded-full "
              src={`users/profile_picture/teste.png`}
              width={1}
              height={1}
              alt="Profile Picture"
            />
          </div>

          <div className=" top-30 left-10 flex flex-col">
            <button className="bg-gray-800 h-10 w-10 rounded-full ">+</button>
            <button className="bg-gray-800 h-10 w-10 rounded-full mt-2"></button>
          </div>

        </div>





        <div className=" flex items-center justify-end">

          <div className="flex w-3/4 mr-3">
            <div className=" p-4 w-1/3 ">
              <h2 className="font-bold text-2xl">João Silva</h2>
              <p className="text-gray-500">São Paulo - SP</p>
              <div className="flex pt-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#daa520" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#daa520" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>

                <p className="ml-1 font-bold">4,1</p>

              </div>
              <p className="underline underline-offset-1">Sem associação no momento</p>
            </div>

            <div className="w-2/3 bg-white mt-5 rounded-md">
              <p className="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea dignissimos repellendus dolor recusandae consectetur laboriosam nulla quod tempora ipsam, voluptas modi sed adipisci natus eius sunt soluta fuga deserunt cumque.</p>
            </div>
          </div>

        </div>


        <div className="w-auto bg-white h-48 mt-10 rounded-md m-3">
          <div className="flex justify-around items-center h-20">
            <div>Visão Geral</div>
            <div>Publicações</div>
          </div>
        </div>




      </div>
    </>
  );
}
