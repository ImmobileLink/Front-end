'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

interface DismissableModalProps {
  buttonLabel: string
  modalTitle: string;
  modalBody: string;
  onAccept: Promise<void>;
  onDecline: Promise<void>;
}

export default function DismissableModal({buttonLabel, modalTitle, modalBody, onAccept, onDecline}: DismissableModalProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <>
      <Button onClick={() => props.setOpenModal('dismissible')}>{buttonLabel}</Button>
      <Modal dismissible show={props.openModal === 'dismissible'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {modalBody}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


