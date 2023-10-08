import Image from "next/image";

interface CapaProps { }

export default async function Capa({ }: CapaProps) {
    return (
            <div className="h-44 overflow-hidden rounded-md relative">
                <Image
                    className="w-screen my-auto"
                    src="users/cover/cover.jpg"
                    alt="capa"
                    width={1}
                    height={1}
                />
            </div>
    );
}