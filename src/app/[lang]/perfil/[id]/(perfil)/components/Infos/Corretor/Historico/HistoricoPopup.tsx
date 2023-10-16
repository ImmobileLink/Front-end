"use client";
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal } from "flowbite-react";
import { useProfileStore } from '../../../../../../../../../../lib/store/profileStore';
import { getHistorico, insertHistorico } from '../../../../../../../../../../lib/utils/Historico';

interface HistoricoPopupProps {
    props: any;
}

export default function HistoricoPopup({ props }: HistoricoPopupProps) {

    const state = useProfileStore.getState()

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();


    const onSubmit = async(data: any) => {
        const {error} = await insertHistorico(state.profileData?.id!, data.data_inicio, data.data_fim, data.descricao, data.nome_empresa)

        if(error){
            console.error(error)
        }
    };
    
    return (
        <>
            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>Adicionar Historico</Modal.Header>
                <Modal.Body>
                    <form className='gap-3'>
                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Nome da Empresa*</label>
                            <input {...register('nome_empresa', { required: true })}
                                className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent ' />
                            {errors.nomeEmpresa && <span className="text-red-500 text-xs mt-1">Nome da empresa é obrigatório.</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Data de Início (Mês e Ano)</label>
                            <Controller
                                name="data_inicio"
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
                                name="data_fim"
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
