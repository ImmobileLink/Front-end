"use client";

import { ReactNode, Suspense, useContext  } from "react";
import { ChatContext } from "../[[...idsala]]/chatContext";
import { Chat } from "@/app/i18n/dictionaries/types";
import { Spinner } from "flowbite-react";

interface ChatSpaceClientProps {
  children: ReactNode,
  dict: Chat;
  idsala: string,
  userId: string | undefined;
}

export default function ChatSpaceClient({ children, dict, idsala, userId }: ChatSpaceClientProps) {
  const { chatView } = useContext(ChatContext)

  let style = 'hidden lg:block'

  if (chatView == true) {
    if (typeof idsala === 'undefined') {
      style = 'hidden lg:block'
    }
    else {
      style = 'block'
    }
  }
  else {
    if (chatView == false)
      style = 'hidden lg:block'
  }

  return (
    <Suspense fallback={
      <div className={`${style} h-full lg:h-5/6 lg:w-7/12 flex flex-col w-screen rounded-md bg-white dark:bg-dark-100 drop-shadow-md justify-center items-center`}>
        <Spinner size='xl'/>
      </div>
    }>
      <div className={`${style} h-full lg:h-5/6 lg:w-7/12 flex flex-col w-screen rounded-md bg-white dark:bg-dark-100 drop-shadow-md`}>
        {children}
      </div>
    </Suspense>
  );
}
