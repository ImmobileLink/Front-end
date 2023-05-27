import Image from "next/image";

interface AvatarProps {
    userId: any;
}

export default async function Avatar({userId}: AvatarProps) { 
    return (
        <div>
            <Image
                className="mr-3 mb-3 h-14 w-auto"
                src={`users/profile_picture/${userId}`}
                width={1}
                height={1}
                alt="Profile Picture"
            />
        </div>              
    )
}