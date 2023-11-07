import Link from "next/link";

interface CardTitleLinkProps {
    title: string;
    link: string;
}

export default function CardTitleLink({ title, link }: CardTitleLinkProps) {
    return (
        <div className="flex flex-col pb-5 justify-center select-none">
            <span className="text-black dark:text-white text-2xl text-center">
                <Link className="hover:underline" href={link}>{title}</Link>
            </span>
        </div>
    );
}
