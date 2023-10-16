import Image from "next/image";
import { useProfileStore } from "@/../../lib/store/profileStore";
import EditCapa from "./Edit/EditCapa";

interface CapaProps { }

export default function Capa({ }: CapaProps) {

    const state = useProfileStore.getState()
    const route = state.profileData?.capa
    const isOwn = state.isOwn

    return (
        <>
            <div className="h-44 overflow-hidden rounded-md relative">
                <Image
                    className="w-screen my-auto"
                    src={`users/cover/${route}?random=${Math.random()}`}
                    alt="capa"
                    width={1}
                    height={1}
                />
            </div>

            {isOwn && <EditCapa/>}
        </>
    );
}