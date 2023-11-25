import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import EditAvatar from "./Edit/EditAvatar";
import Image from "next/image";

interface AvatarProps {
    
}

export default async function AvatarCabecalho({  }: AvatarProps) {

    const state = useProfileStore.getState()
    const isOwn = state.isOwn
    const avatar = state.profileData?.avatar
    const route =  avatar == 'nopfp' ? 'users/profile_picture/nopfp' : `users/${state.profileData?.id}/profile_picture/${avatar}`

    return (
        <div className={`group relative w-34 h-34 rounded-full bg-white flex justify-center items-center ${isOwn ? 'hover:cursor-pointer filter hover:grayscale hover:contrast-100' : ''}`}>
            {isOwn && <EditAvatar />}
            <>
                <Image
                    className="w-32 h-32 m-[5px] rounded-full ring-1 ring-gray-400 object-cover"
                    src={route}
                    width={1}
                    height={1}
                    quality={10}
                    priority 
                    alt="Profile Picture"
                />
            </>
        </div>
    );
}