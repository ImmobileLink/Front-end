"use client"

import React, { useState } from 'react';
import VisaoGeral from "./VisaoGeral"

import { Tabs } from 'flowbite-react';
import { HiOfficeBuilding, HiDocumentText, HiCalendar } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';


interface InfosProps {
  dict: any;
}


export default function InfosEmpresa({  dict }: InfosProps) {

  return (
    <Tabs.Group aria-label="Tabs with underline" style="underline">
      <Tabs.Item active icon={HiOfficeBuilding} title="Profile" >
      </Tabs.Item>

      <Tabs.Item icon={HiDocumentText} title="Posts">
        <p>
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </p>
      </Tabs.Item>

      <Tabs.Item icon={MdDashboard} title="Dashboard">
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
  );
};
