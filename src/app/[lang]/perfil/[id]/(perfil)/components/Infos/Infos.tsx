"use client"

import React, { useEffect, useState } from 'react';
import { Tabs } from 'flowbite-react';
import { HiUserCircle, HiDocumentText, HiCalendar } from 'react-icons/hi';

import { useProfileStore } from '../../../../../../../../lib/store/profileStore';
import Calendario from '@/app/[lang]/(components)/Calendario';
import VisaoGeralCorretor from './Corretor/VisaoGeralCorretor';
import VisaoGeralEmpresa from './Empresa/VisaoGeralEmpresa';
import Posts from './Posts';


interface InfosProps {
  isAssociado: boolean;
}



export default function Infos({ isAssociado }: InfosProps) {


  const state = useProfileStore.getState()
  const isOwn = state.isOwn
  const type = state.profileData?.type
  const showCalendar = isOwn || isAssociado
  


  return (
    <div className='ring-2 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 drop-shadow-md bg-white rounded-md mt-3 pb-10'>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
      >
        <Tabs.Item
          active
          icon={HiUserCircle}
          title="Profile"
        >
          {type == "corretor" ? (<VisaoGeralCorretor />) : (<VisaoGeralEmpresa />)}
        </Tabs.Item>
        <Tabs.Item
          icon={HiDocumentText}
          title="Posts"
        >
          <Posts />
        </Tabs.Item>

        {isOwn && (
          <Tabs.Item
            icon={HiDocumentText}
            title="Saved Posts"
          >
            <p>PostsSalvos</p>
          </Tabs.Item>
        )}


        {showCalendar &&  (
          <Tabs.Item
            icon={HiCalendar}
            title="Schedule"
            className='hidden'
          >
            <Calendario />

          </Tabs.Item>
        )}



      </Tabs.Group>
    </div>
  );
};
