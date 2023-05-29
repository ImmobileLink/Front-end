"use client";

interface UserCardProps {
  usuario: any
}

export default function UserCard({usuario}: UserCardProps) {
  return (
    <>
      <div>{usuario}</div>
    </>
  );
}
