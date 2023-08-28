'use client';

import { Select } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';

interface SelectInputProps {
  dataSet: string[];
  setActive: Dispatch<SetStateAction<any>>;
}

export default function SelectInput({dataSet, setActive}: SelectInputProps) {
  return (
      <Select
        required
        className="w-20"
        onChange={e => setActive(e.target.value)}
      >
        {
          dataSet.map(item => {
            return (<option key={item}>{item}</option>)
          })
        }
      </Select>
  )
}


