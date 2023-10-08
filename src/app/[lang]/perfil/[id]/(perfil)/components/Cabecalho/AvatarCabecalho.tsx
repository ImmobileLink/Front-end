import Avatar from "@/app/[lang]/(components)/Avatar";

interface AvatarProps {
    route: string;
 }

export default async function AvatarCabecalho({ route}: AvatarProps) {
    return (
        <div className="w-34 h-34 rounded-full bg-white flex justify-center items-center">
            <Avatar route={route} size={"l"} />
        </div>
    );
}