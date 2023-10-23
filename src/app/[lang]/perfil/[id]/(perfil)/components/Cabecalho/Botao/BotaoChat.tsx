import Link from "next/link";

interface botaoChatProps {
    sala: string;
}

export default async function BotaoChat({ sala }: botaoChatProps) {
    return (
        <Link href={sala}>
            <button className="w-[100px] text-white bg-gray-500 hover:bg-gray-700 font-medium rounded-lg text-sm py-2.5 mb-1 ">
                Conversar
            </button>
        </Link>
    );
}