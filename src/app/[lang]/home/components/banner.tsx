"use client";

interface BannerProps {
    lang: string;
}

export default function Banner({ lang }: BannerProps) {
    return (
        <div className="bg-white dark:bg-gray-900 flex flex-col items-center text-center justify-center py-20">
            <p className="font-semibold text-4xl px-12">Lorem ipsum</p>
            <p className="text-cyan-950 dark:text-cyan-100 font-semibold text-4xl px-12">
                dolor sit amet
            </p>
            <p className="py-4 px-8">
                Praesent scelerisque aliquam est eget porta. Sed id rhoncus
                lorem, et tincidunt lacus. Fusce lacinia eu elit vitae ornare.
            </p>
            <button
                onClick={() => console.log("trata acesso")}
                className="flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
            >
                ACESSAR PLATAFORMA
            </button>
        </div>
    );
}
