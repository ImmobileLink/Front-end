"use client";

import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Button, Modal } from 'flowbite-react';


interface EditProfileProps { }

export default function EditProfile({ }: EditProfileProps) {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };


    return (
        <>
            <button onClick={() => props.setOpenModal('default')}>
                <AiFillEdit size={30} />
            </button>

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                            companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
                            ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as
                            possible of high-risk data breaches that could personally affect them.
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
    );
}
