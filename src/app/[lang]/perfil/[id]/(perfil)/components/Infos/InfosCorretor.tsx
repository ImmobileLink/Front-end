"use client"

import React, { useEffect, useRef, useState } from 'react';
import VisaoGeral from "./Corretor/VisaoGeral"
import Publicacoes from "./Publicacoes"

import { Button, Tabs, TabsRef } from 'flowbite-react';
import { HiUserCircle, HiDocumentText, HiCalendar } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useProfileContext } from '../../context/ProfileContext';
import { useButtonContext } from '../../context/TabsContext';



interface InfosProps {

}


export default function InfosCorretor({ }: InfosProps) {


  const { activeTab, setTab, tabsRef } = useButtonContext()


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
          <VisaoGeral />
        </Tabs.Item>
        <Tabs.Item
          icon={HiDocumentText}
          title="Posts"
        >
          
        </Tabs.Item>
          

        <Tabs.Item
          icon={HiCalendar}
          title="Schedule"
        >
          <p>
            This is
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            .
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </p>
        </Tabs.Item>
      </Tabs.Group>      
    </div>
  );
};
