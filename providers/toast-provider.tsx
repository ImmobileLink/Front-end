"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if(!isMounted) {
    return null
  }

  return (
    <div>
      <Toaster position="top-center"/>
    </div>
  )
}