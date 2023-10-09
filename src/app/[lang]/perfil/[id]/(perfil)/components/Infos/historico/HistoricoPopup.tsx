"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal } from "flowbite-react";

interface HistoricoPopupProps {
    props: any;
    edit: boolean
}

export default function HistoricoPopup({ props }: HistoricoPopupProps) {
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <>
            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>Adicionar Historico</Modal.Header>
                <Modal.Body>
                    <form className='gap-3'>
                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Nome da Empresa*</label>
                            <input {...register('nomeEmpresa', { required: true })}
                                className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent ' />
                            {errors.nomeEmpresa && <span className="text-red-500 text-xs mt-1">Nome da empresa é obrigatório.</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Data de Início (Mês e Ano)</label>
                            <Controller
                                name="dataInicio"
                                control={control}
                                rules={{ required: 'Data de início é obrigatória' }}
                                render={({ field }) =>
                                    <input
                                        type="month"
                                        className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                        {...field} />}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Data de Fim (Mês e Ano)</label>
                            <Controller
                                name="dataFim"
                                rules={{ required: 'Data de fim é obrigatória' }}
                                control={control}
                                render={({ field }) =>
                                    <input
                                        type="month"
                                        className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                        {...field} />} />
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Descrição</label>
                            <textarea
                                className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                {...register('descricao')} />
                        </div>
                    </form>

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
