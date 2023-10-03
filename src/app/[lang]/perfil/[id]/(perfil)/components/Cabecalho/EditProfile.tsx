"use client";

import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Button, Modal } from 'flowbite-react';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";


interface EditProfileProps {
    data: any;
}

export default function EditProfile({ data }: EditProfileProps) {
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = (data: any) => {
        console.log(errors)
    }

    return (
        <>
            <button onClick={() => props.setOpenModal('default')}>
                <AiFillEdit size={30} />
            </button>

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>Editar Perfil</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 sm:mx-auto sm:w-full sm:max-w-sm text-sm" >
                        <div className="flex flex-col">
                            <label className="text-gray-300">Nome</label>
                            <input type="text" {...register("name", { required: true })} className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent`} />
                            {errors?.name?.type == 'required' && <p className="text-red-500 text-xs mt-1">É preciso inserir um nome</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-300">Sobrenome</label>
                            <input type="text" {...register("lastName", { required: true })} className="py-2.5 px-0 w-full text-base text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent" />
                            {errors?.lastName?.type == 'required' && <p className="text-red-500 text-xs mt-1">É preciso inserir um sobrenome</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-300">Sobre</label>
                            <textarea id="" {...register("about")} cols={30} rows={2} className="py-2.5 px-0 w-full text-base text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent"></textarea>
                        </div>

                        <h2 className="text-lg font-bold">Localidade</h2>

                        {/* comercial & { cep & UF } */}
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full ">
                                    <label className="text-sm text-gray-500 dark:text-gray-300">
                                        CEP
                                    </label>
                                    <InputMask
                                        type="text"
                                        mask="99999-999"
                                        className={`bg-transparent block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                        placeholder=" "
                                    />

                                    {/* <label className="text-red-500 text-xs">
                                        erro
                                    </label> */}
                                </div>

                                <div className="z-0 group ">
                                    <label className="text-sm text-gray-500 dark:text-gray-300">
                                        UF
                                    </label>
                                    <select className={`mb-1 bg-transparent`}>
                                        <option value="" disabled>SP</option>
                                        {/* {_UFs.map((uf, index) => {
                                            return (
                                                <option
                                                    key={uf + " - " + index}
                                                    className="text-center"
                                                >
                                                    {uf}
                                                </option>
                                            );
                                        })} */}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className="md:justify-end w-full flex">
                            <label className="text-red-500 text-xs mb-8">
                                err
                            </label>
                        </div> */}

                        {/* cidade & bairro */}
                        <div className="grid md:grid-cols-2 md:gap-6 mt-0">
                            <div className="relative z-0 w-full group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    cidade
                                </label>
                                <input
                                    type="text"
                                    className={`bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    placeholder=" "
                                    required

                                />
                                {/*  <label className="text-red-500 text-xs">
                                    err
                                </label> */}
                            </div>
                            <div className="relative z-0 w-full">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    bairro
                                </label>
                                <input
                                    type="text"
                                    className={`bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    placeholder=" "
                                    required
                                    maxLength={11}
                                />
                                {/* <label className="text-red-500 text-xs">
                                    err
                                </label> */}
                            </div>
                        </div>

                        {/* rua */}
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-sm text-gray-500 dark:text-gray-300">
                                Rua
                            </label>
                            <input
                                type="text"
                                className={`bg-transparent  disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                placeholder=" "
                                required

                            />
                            {/* <label className="text-red-500 text-xs">
                                err
                            </label> */}
                        </div>

                        {/* numero & complemento */}
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    numero
                                </label>
                                <input
                                    type="number"
                                    className={`bg-transparent  block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    placeholder=" "
                                    required

                                />
                                {/*  <label className="text-red-500 text-xs">
                                    err
                                </label> */}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    complemento
                                </label>
                                <input
                                    type="text"
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    placeholder=" "
                                    maxLength={18}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button onClick={() => handleSubmit(onSubmit)()}>Confirmar Alterações</Button>
                    <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
