"use client"

import React, { useState } from 'react';

import { useProfileStore } from '../../../../../../../../lib/store/profileStore';
import Calendario from '@/app/[lang]/(components)/Calendario';
import VisaoGeralCorretor from './Corretor/VisaoGeralCorretor';
import VisaoGeralEmpresa from './Empresa/VisaoGeralEmpresa';
import Posts from './Posts';
import PostsSalvos from './PostsSalvos';
import { HiDocumentText } from 'react-icons/hi';
import { Tabs } from 'flowbite-react';


interface InfosProps {
  isAssociado: boolean;
}



export default function Infos({ isAssociado }: InfosProps) {


  const state = useProfileStore.getState()
  const isOwn = state.isOwn
  const type = state.profileData?.type
  const showCalendar = isOwn || isAssociado
  const dict = state.dict!.profile.infos

  const [tab, setTab] = useState<number>(1)

  return (
    <div className='ring-2 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 drop-shadow-md bg-white rounded-md mt-3 pb-5'>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600">
        <ul className="flex overflow-x-auto">
          <li className="mr-2">
            <a className={`inline-block cursor-pointer p-3 md:p-4 rounded-t-lg border-b-2 ${tab !== 1 ? 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' : 'text-blue-600 border-blue-600'}`} onClick={() => setTab(1)}>{dict.profile.data}</a>
          </li>
          <li className="mr-2">
            <a className={`inline-block cursor-pointer p-3 md:p-4 rounded-t-lg border-b-2 ${tab !== 2 ? 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' : 'text-blue-600 border-blue-600'}`} onClick={() => setTab(2)}>{dict.posts}</a>
          </li>
          {isOwn && (
            <li className="mr-2">
              <a className={`inline-block cursor-pointer p-3 md:p-4 rounded-t-lg border-b-2 ${tab !== 3 ? 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' : 'text-blue-600 border-blue-600'}`} onClick={() => setTab(3)}>{dict.savedPosts}</a>
            </li>
          )}
          {showCalendar && (
            <li className="mr-2 lg:hidden">
              <a className={`inline-block cursor-pointer p-3 md:p-4 rounded-t-lg border-b-2 ${tab !== 4 ? 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300' : 'text-blue-600 border-blue-600'}`} onClick={() => setTab(4)}>{dict.schedule}</a>
            </li>
          )}
        </ul>
      </div>

      {tab == 1 && (
        <div className='mt-5'>
          {type == 'corretor' ? (<VisaoGeralCorretor />) : (<VisaoGeralEmpresa />)}
        </div>
      )}

      {tab == 2 && (
        <div className=''>
          <Posts />
        </div>
      )}

      {tab == 3 && isOwn && (
        <div className=''>
          <PostsSalvos />
        </div>

      )}

      {tab == 4 && (
        <div className=" flex justify-center items-center lg:hidden flex-col">
          <div className='mt-4 w-fit bg-slate-300 rounded-md px-1 py-3 ring-2 ring-gray-300  drop-shadow-md dark:text-white mx-1 mb-3 md:m-5'>
            <Calendario />
          </div>
        </div>
      )}

    </div>
  );
};
