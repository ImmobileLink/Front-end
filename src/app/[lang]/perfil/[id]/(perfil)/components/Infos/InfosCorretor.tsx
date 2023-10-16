"use client"

import React, { useState } from 'react';
import VisaoGeral from "./Corretor/VisaoGeral/VisaoGeral"
import Publicacoes from "./Publicacoes"

import { Tabs } from 'flowbite-react';
import { HiUserCircle, HiDocumentText, HiCalendar } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';



interface InfosProps {
  
}


export default function InfosCorretor({ }: InfosProps) {

  
  return (
    <Tabs.Group
      aria-label="Tabs with underline"
      style="underline"
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
        disabled
      >
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Settings tab's associated content
          </span>
          .
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </p>
      </Tabs.Item>
      <Tabs.Item
        icon={MdDashboard}
        title="Dashboard"
      >
        <p>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Dashboard tab's associated content
          </span>
          .
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </p>
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
  );
};
