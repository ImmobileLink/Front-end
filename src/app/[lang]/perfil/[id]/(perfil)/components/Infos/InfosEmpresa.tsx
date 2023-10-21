"use client"

import React, { useState } from 'react';
import VisaoGeral from "./Empresa/VisaoGeral"

import { Tabs } from 'flowbite-react';
import { HiOfficeBuilding, HiDocumentText, HiCalendar } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useProfileStore } from '../../../../../../../../lib/store/profileStore';
import { useButtonContext } from '../../context/TabsContext';


interface InfosProps { }


export default function InfosEmpresa({ }: InfosProps) {

  const dict = useProfileStore.getState().dict

  const { activeTab, setTab, tabsRef } = useButtonContext()


  return (
    <div className='ring-2 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 drop-shadow-md bg-white rounded-md mt-3 pb-10'>
      <Tabs.Group
        aria-label="Tabs with underline"
        style="underline"
        ref={tabsRef}
        onActiveTabChange={(tab) => setTab(tab)}
      >
        <Tabs.Item active icon={HiOfficeBuilding} title="Profile" >
          <VisaoGeral />
        </Tabs.Item>

        <Tabs.Item icon={HiDocumentText} title="Posts">
          <p>
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>

        <Tabs.Item icon={HiCalendar} title="Schedule">
          <p>
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};
