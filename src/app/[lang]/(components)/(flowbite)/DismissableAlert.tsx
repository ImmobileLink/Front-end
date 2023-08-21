'use client';

import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import Avatar from '../Avatar';

export default function DismissableAlert() {
  return (
    <Alert
      additionalContent={<Avatar userId={undefined} />}
      color="warning"
      icon={HiInformationCircle}
    >
      <span>
        <p>
          <span className="font-medium">
            Info alert!
          </span>
          Change a few things up and try submitting again.
        </p>
      </span>
    </Alert>
  )
}


