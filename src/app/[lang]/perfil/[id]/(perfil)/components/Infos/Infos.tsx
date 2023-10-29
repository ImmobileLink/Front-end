"use client"

import React, { useEffect, useRef, useState } from 'react';

import { Button, Tabs, TabsRef } from 'flowbite-react';
import { HiUserCircle, HiDocumentText, HiCalendar } from 'react-icons/hi';

import { useProfileStore } from '../../../../../../../../lib/store/profileStore';
import Calendario from '@/app/[lang]/(components)/Calendario';
import VisaoGeralCorretor from './Corretor/VisaoGeralCorretor';
import VisaoGeralEmpresa from './Empresa/VisaoGeralEmpresa';
import Posts from './Posts';
import { useButtonContext } from '../../context/TabsContext';



interface InfosProps {

}


export default function Infos({ }: InfosProps) {


  const { activeTab, setTab, tabsRef } = useButtonContext()
  const state = useProfileStore.getState()
  const isOwn = state.isOwn
  const type = state.profileData?.type


  return (
    <div className='ring-2 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 drop-shadow-md bg-white rounded-md mt-3 pb-10'>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        ref={tabsRef}
        onActiveTabChange={(tab) => setTab(tab)}

      >
        <Tabs.Item
          active
          icon={HiUserCircle}
          title="Profile"
        >
          {type == "corretor" ? (<VisaoGeralCorretor/>): (<VisaoGeralEmpresa/>)}
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
            <p>PostsSalvbos</p>
          </Tabs.Item>
        )}



        <Tabs.Item
          icon={HiCalendar}
          title="Schedule"
          className='hidden'
        >
          <div>
            <Calendario />
          </div>

        </Tabs.Item>


      </Tabs.Group>
    </div>
  );
};
