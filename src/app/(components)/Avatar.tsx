import Image from "next/image";

interface AvatarProps {
    userId: any;
}

export default function Avatar({userId}: AvatarProps) { 
    return (
        <div>
            <Image
                className="mr-2 h-14 w-auto"
                src={`users/profile_picture/${userId}.png`}
                width={1}
                height={1}
                alt="Profile Picture"
            />
        </div>              
    )
}