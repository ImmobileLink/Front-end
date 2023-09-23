"use client";

import { ReactNode, useState } from "react";

interface DropdownProps {
  label: string | ReactNode;
  items: {
    label: string | ReactNode;
    onClick: () => void;
  }[];
}

export default function Dropdown({ label, items }: DropdownProps) {
  const [isActive, setisActive] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => { setisActive(!isActive) }} className="relative float-right h-fit text-2xl text-gray-900 rounded-lg dark:text-white " type="button">
        {label}
      </button>
      <div className={"absolute top-12 right-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 " + (!isActive && "hidden")}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {
            items.map((item, index) => {
              return (
                <li key={index}>
                  <button onClick={item.onClick} className="block text-start w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" type="button">{item.label}</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
