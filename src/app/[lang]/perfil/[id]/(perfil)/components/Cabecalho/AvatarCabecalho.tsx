import Avatar from "@/app/[lang]/(components)/Avatar";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import { AiFillEdit } from "react-icons/ai";
import EditAvatar from "./Edit/EditAvatar";
import Image from "next/image";

interface AvatarProps {
    route: string;
}

export default async function AvatarCabecalho({ route }: AvatarProps) {

    const state = useProfileStore.getState()
    const isOwn = state.isOwn

    return (
        <div className={`group relative w-34 h-34 rounded-full bg-white flex justify-center items-center ${isOwn ? 'hover:cursor-pointer filter hover:grayscale hover:contrast-100' : ''}`}>
            {isOwn && <EditAvatar />}
            <>
                <Image
                    className="w-32 h-32 m-[5px] rounded-full ring-1 ring-gray-400"
                    src={`users/profile_picture/${route}?random=${Math.random()}`}
                    width={1}
                    height={1}
                    quality={10}
                    alt="Profile Picture"
                />
            </>
        </div>
    );
}