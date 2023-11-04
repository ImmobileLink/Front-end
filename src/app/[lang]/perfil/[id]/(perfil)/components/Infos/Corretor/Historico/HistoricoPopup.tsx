"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal } from "flowbite-react";
import { useProfileStore } from '../../../../../../../../../../lib/store/profileStore';
import { insertHistorico, updateHistorico } from '../../../../../perfilUtils/Historico';
import { useProfileContext } from '../../../../context/ProfileContext';
import { v4 as uuidv4 } from 'uuid';

interface HistoricoPopupProps {
    props: any;
}



export default function HistoricoPopup({ props }: HistoricoPopupProps) {

    const state = useProfileStore.getState()

    const { historico, setHistorico } = useProfileContext()


    const {
        handleSubmit,
        control,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const defaultValues = {
        nome_empresa: "",
        data_inicio: "",
        data_fim: "",
        descricao: ""
    }
    const [erro, setErro] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (props.idEditHistorico) {
            const data = historico?.find((item) => item.id === props.idEditHistorico);

            setValue('nome_empresa', data ? data.nome_empresa : "teste");
            setValue('data_inicio', data ? data.data_inicio.substring(0, 7) : "");
            setValue('data_fim', data ? data.data_fim?.substring(0, 7) : "");
            setValue('descricao', data ? data.descricao : "");

            console.log(data);
        } else {
            reset(defaultValues)
        }
    }, [props.openModal])





    const onSubmit = async (data: any) => {
        setErro(undefined);
        let hist; // Declare a variável hist aqui

        if (data.data_fim && data.data_inicio > data.data_fim) {
            setErro("A data de início não pode ser superior à data de fim");
        } else {
            let data_fim = data.data_fim ? data.data_fim + "-01" : null;
            let id = props.idEditHistorico ? props.idEditHistorico : uuidv4()

            hist = [
                {
                    id: id,
                    data_fim: data_fim,
                    data_inicio: data.data_inicio + "-01",
                    descricao: data.descricao,
                    id_corporacao: null, //nao estou usando
                    id_corretor: state.profileData?.id!,
                    nome_empresa: data.nome_empresa
                }
            ];

            const { error } = props.idEditHistorico ? await updateHistorico(hist) : await insertHistorico(hist)

            if (error) {
                console.error(error);
                setErro("Erro ao cadastrar histórico");
            } else {
                if (historico) {
                    if (props.idEditHistorico) {
                        const indice = historico.findIndex(objeto => objeto.id === id);
                        historico[indice] = hist[0]
                        setHistorico(historico)
                    } else {
                        setHistorico([...historico, ...hist]);
                    }
                } else {
                    setHistorico([...hist]);
                }
                console.log(historico);
                props.setIdEditHistorico(null)
                props.setOpenModal(undefined);
            }
        }
    };


    const cancelar = () => {
        props.setIdEditHistorico(null);
        props.setOpenModal(undefined);
    }


    return (
        <>
            <Modal show={props.openModal === 'default'} onClose={cancelar}>
                <Modal.Header>{props.idEditHistorico ? <p>Editar</p> : <p>Adicionar Histórico</p>}</Modal.Header>
                <Modal.Body>
                    <form className='gap-3'>
                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Nome da Empresa*</label>
                            <input {...register('nome_empresa', { required: true })}
                                className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent ' />
                            {errors.nome_empresa && <span className="text-red-500 text-xs mt-1">Nome da empresa é obrigatório.</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Data de Início (Mês e Ano)</label>
                            <Controller
                                name="data_inicio"
                                control={control}
                                rules={{
                                    required: true,
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const minimumDate = new Date('1900-01-01');
                                        const today = new Date();

                                        if (selectedDate < minimumDate) {
                                            return 'O ano mínimo permitido é 1900.';
                                        }
                                        if (selectedDate > today) {
                                            return 'A data não pode ser maior do que hoje.';
                                        }
                                        return true;
                                    }
                                }}
                                render={({ field }) =>
                                    <input
                                        type="month"
                                        className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                        {...field} />}
                            />
                            {errors.data_inicio && (<span className="text-red-500 text-xs mt-1">{errors.data_inicio.message}</span>)}

                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Data de Fim (Mês e Ano)</label>
                            <Controller
                                name="data_fim"
                                rules={{
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const minimumDate = new Date('1900-01-01');
                                        const today = new Date();

                                        if (selectedDate < minimumDate) {
                                            return 'O ano mínimo permitido é 1900.';
                                        }
                                        if (selectedDate > today) {
                                            return 'A data não pode ser maior do que hoje.';
                                        }
                                        return true;
                                    }
                                }}
                                control={control}
                                render={({ field }) =>
                                    <input
                                        type="month"
                                        className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                        {...field} />} />
                            {errors.data_fim && <p className="text-red-500 text-xs mt-1">{errors.data_fim.message}</p>}

                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">Descrição</label>
                            <textarea
                                className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                {...register('descricao')} />
                        </div>
                        {erro && <p className="text-red-500 text-xs mt-1">{erro}</p>}
                    </form>

                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button onClick={() => handleSubmit(onSubmit)()}>Confirmar Alterações</Button>
                    <Button color="gray" onClick={cancelar}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
function atualizaHistorico(hist: {
    id: any; data_fim: string | null; data_inicio: string; descricao: any; id_corporacao: null; //nao estou usando
    id_corretor: string; nome_empresa: any;
}[]): { error: any; } | PromiseLike<{ error: any; }> {
    throw new Error('Function not implemented.');
}

