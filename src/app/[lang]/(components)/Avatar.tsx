import Image from "next/image";

interface AvatarProps {
  route: string;
  size?: number | "s" | "m" | "l";
  id: string;
}

export default function Avatar({id, route, size }: AvatarProps) {

  let styleImage = "";

  const path = route == "nopfp" ? "users/profile_picture/nopfp" : `users/${id}/profile_picture/${route}`

  if (size == "l") {
    styleImage = "w-32 h-32 m-2 rounded-full ring-1 ring-gray-400 object-cover";
  } else if (size == "m") {
    styleImage = "w-16 h-16 m-2 rounded-full ring-1 ring-gray-400 object-cover";
  } else if (size == "s") {
    styleImage = "w-14 h-14 m-2 rounded-full ring-1 ring-gray-400 object-cover";
  } else {
    if (typeof size === "number") {
      styleImage = `h-${size} w-${size} m-2 rounded-full ring-1 ring-gray-400 object-cover`;
    } else {
      styleImage = "h-14 w-14 m-2 rounded-full ring-1 ring-gray-400 object-cover";
    }
  }

  return (
    <>
      <Image
        className={styleImage}
        src={path}
        width={1}
        height={1}
        quality={10}
        alt="Profile Picture"
      />
    </>
  );
}
