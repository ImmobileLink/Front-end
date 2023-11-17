import Image from "next/image";
import { useProfileStore } from "@/../../lib/store/profileStore";
import EditCapa from "./Edit/EditCapa";

interface CapaProps { }

export default function Capa({ }: CapaProps) {

    const state = useProfileStore.getState()
    const isOwn = state.isOwn
    const capa = state.profileData?.capa
    const route =  capa == 'nopfp' ? 'users/cover/nopfp' : `users/${state.profileData?.id}/cover/${capa}`

    return (
        <>
            <div className="h-44 overflow-hidden rounded-t-md relative">
                <Image
                    className="w-screen my-auto"
                    src={route}
                    alt="capa"
                    width={1}
                    height={1}
                />
            </div>

            {isOwn && <EditCapa/>}
        </>
    );
}