"use client";
import { useSupabase } from "@/app/SupabaseProvider";
import { useEffect, useState } from "react";

interface FeedPrincipalProps {}

export default function FeedPrincipal({}: FeedPrincipalProps) {
  const [userId, setUserId] = useState("");
  const { supabase } = useSupabase();
  const [isLoading, setLoading] = useState(true);

  const handlePfp = async () => {
    const session = await supabase.auth.getUser();
    setUserId(session.data.user?.id!);
    setLoading(false);
  };

  useEffect(() => {
    handlePfp();
  });

  //chamada do supabase
  //map

  return <>Feed</>;
}
