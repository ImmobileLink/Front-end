"use client";
import Image from "next/image";
import Avatar from "../(components)/Avatar"

interface pageProps { }

export default function page({ }: pageProps) {
  return (
    <>
      <div className="bg-escuro2 overflow-x-hidden box-border text-black	">
        <div className="h-screen w-screen">
          <div className="flex relative max-w-6xl mx-auto px-4 mt-4">
            <div className="w-2/3 bg-branco mr-3 rounded-md overflow-hidden">
              <div className="h-36 overflow-hidden">
                <Image
                  className="w-screen "
                  src="users/cover/cover.jpg"
                  alt="capa"
                  width={1}
                  height={1}
                />
              </div>

              <div className="absolute top-24 left-6">
                <div className="w-36 h-36 rounded-full bg-branco flex justify-center items-center">
                  <Image
                    className=" w-32 h-32 rounded-full "
                    src={`users/profile_picture/teste.png`}
                    width={1}
                    height={1}
                    alt="Profile Picture"
                  />
                </div>

              </div>

              <div className="ml-36 flex items-center justify-around">
                <div className="w-1/4 p-4 ">
                  <h2 className="font-bold text-2xl">João Silva</h2>
                  <p className="text-gray-500">São Paulo - SP</p>
                  <div className="flex pt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#daa520" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#daa520" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>

                    <p className="ml-1 font-bold">4,1</p>
                  </div>
                </div>

                <div className="w-2/3 bg-white mt-5 rounded-md">
                  <p className="p-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea dignissimos repellendus dolor recusandae consectetur laboriosam nulla quod tempora ipsam, voluptas modi sed adipisci natus eius sunt soluta fuga deserunt cumque.</p>
                </div>
              </div>




            </div>









            <div className="w-1/3 bg-branco rounded-md h-screen">
              <h2>Tabela Aqui</h2>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
