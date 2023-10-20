"use client";
import Avatar from "../../(components)/Avatar";
import Image from "next/image";
import { PublicacaoCompleta } from "../../../../../lib/modelos";
import { formataData } from "../../../../../lib/Utils/formataData";
import { Card } from "../../(components)/(compositions)/(card)";
import Dropdown from "./Dropdown";
import { BsChatSquareText, BsHeart, BsShare, BsThreeDots } from "react-icons/bs";

interface PostItemProps {
  publicacao: PublicacaoCompleta;
}

export default function PostItem({ publicacao }: PostItemProps) {
  return (
    <div className="mb-4">
      <Card.Root>
        <Card.Content>
          <div className="w-full h-fit min-h-[50px] px-4">
            <div className="w-full h-fit flex justify-between mb-4">
              <div className="flex justify-center items-center gap-2 mt-1">
                <Avatar route={publicacao.avatar} />
                <div>
                  <p>{publicacao.nomeautor}</p>
                  <p className="text-xs">{formataData(publicacao.criadoem)}</p>
                </div>
              </div>
              <div className="h-full">
                <Dropdown label={<BsThreeDots />} items={[{ label: "reportar", onClick: () => { alert("reportado!") } }, { label: "ver mais", onClick: () => { alert("ver mais!") } }]} />
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm">{publicacao.conteudo}</p>
              <div className="flex w-full justify-center">
                {
                  publicacao.imagem &&
                  <Image src={`publicacoes/imagens/${publicacao.imagem}`} alt={publicacao.id} width={1} height={1} className="w-auto h-fit max-h-[480px] mt-2" />
                }
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex text-xl items-center gap-3">
                <button onClick={() => { alert("curtiu") }}><BsHeart className="hover:cursor-pointer hover:text-red-400 ease-in duration-100" /></button>
                <span>10</span>
              </div>
              <div className="flex text-xl items-center gap-3">
                <button onClick={() => { alert("comentou") }}><BsChatSquareText className="hover:cursor-pointer" /></button>
                <span>10</span>
              </div>
              <div className="flex text-xl items-center gap-3">
                <button onClick={() => { alert("compartilhou") }}><BsShare className="hover:cursor-pointer" /></button>
                <span>10</span>
              </div>
            </div>
            <div>
              <textarea
                className="w-full bg-gray-100 grow p-3 h-12 rounded-md text-slate-900"
                placeholder={"Leave a comment"}
              ></textarea>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
