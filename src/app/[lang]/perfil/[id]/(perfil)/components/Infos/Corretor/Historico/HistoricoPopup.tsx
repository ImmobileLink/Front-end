"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Modal } from "flowbite-react";
import { useProfileStore } from '../../../../../../../../../../lib/store/profileStore';
import { insertHistorico, updateHistorico } from '../../../../../perfilUtils/Historico';
import { useProfileContext } from '../../../../context/ProfileContext';
import { v4 as uuidv4 } from 'uuid';
import { clientSupabase } from 'lib/utils/clientSupabase';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker'; // Importe o DatePicker
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface HistoricoPopupProps {
    props: any;
}


export default function HistoricoPopup({ props }: HistoricoPopupProps) {
    const supabase = clientSupabase()

    const state = useProfileStore.getState()
    const dict = state.dict!.profile.infos.profile.historic
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const { historico, setHistorico } = useProfileContext()


    const {
        handleSubmit,
        control,
        register,
        setValue,
        reset,
        formState: { errors },
    } = useForm();


    const [erro, setErro] = useState<string | undefined>(undefined)

    useEffect(() => {
        const defaultValues = {
            nome_empresa: "",
            data_inicio: "",
            data_fim: "",
            descricao: ""
        }
        if (props.idEditHistorico) {
            const data = historico?.find((item) => item.id === props.idEditHistorico);


            setValue('nome_empresa', data ? data.nome_empresa : "teste");
            setValue('data_inicio', data ? new Date(data.data_inicio).setMonth(new Date(data.data_inicio).getDay() + 1) : "");
            setValue('data_fim', data ? data.data_fim && new Date(data?.data_fim).setMonth(new Date(data?.data_fim).getDay() + 1) : "");
            setValue('descricao', data ? data.descricao : "");

        } else {
            reset(defaultValues)
        }
    }, [historico, props.idEditHistorico, props.openModal, reset, setValue])

    const onSubmit = async (data: any) => {
        setErro(undefined);
        let hist; // Declare a variável hist aqui

        if (data.data_fim && data.data_inicio > data.data_fim) {
            setErro("A data de início não pode ser superior à data de fim");
        } else {
            const formattedStartDate = format(new Date(data.data_inicio), 'yyyy-MM-dd');
            const formattedEndDate = data.data_fim ? format(new Date(data.data_fim), 'yyyy-MM-dd') : null;

            let id = props.idEditHistorico ? props.idEditHistorico : uuidv4()

            hist = [
                {
                    id: id,
                    data_fim: formattedEndDate,
                    data_inicio: formattedStartDate,
                    descricao: data.descricao,
                    id_corporacao: null, //nao estou usando
                    id_corretor: state.profileData?.id!,
                    nome_empresa: data.nome_empresa
                }
            ];

            const result = props.idEditHistorico ? await updateHistorico(hist, supabase) : await insertHistorico(hist, supabase)

            if (!result) {
                setErro("Erro ao cadastrar histórico");
                toast.error("Erro ao atualizar histórico")
            } else {
                if (historico) {
                    if (props.idEditHistorico) {
                        const indice = historico.findIndex(objeto => objeto.id === id);
                        historico[indice] = hist[0]
                        setHistorico(historico)
                        toast.success("Histórico atualizado com sucesso")
                    } else {
                        setHistorico([...historico, ...hist]);
                        toast.success("Histórico inserido com sucesso")
                    }
                } else {
                    setHistorico([...hist]);
                }
                props.setIdEditHistorico(null)
                props.setOpenModal(undefined);
            }
        }
    };


    const cancelar = () => {
        props.setIdEditHistorico(null);
        props.setOpenModal(undefined);
    }

    const validateData = (value: string) => {
        const selectedDate = new Date(value);
        const minimumDate = new Date('1900-01-01');
        const today = new Date();

        if (selectedDate < minimumDate) {
            return dict.minimumAllowedYear;
        }
        if (selectedDate > today) {
            return dict.dateNotGreaterThanToday;
        }
        return undefined;
    };

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckboxChecked)
        setValue('data_fim', '');
    }


    return (
        <>
            <Modal show={props.openModal === 'default'} onClose={cancelar}>
                <Modal.Header>{props.idEditHistorico ? <p>{dict.edit}</p> : <p>{dict.addHistoric}</p>}</Modal.Header>
                <Modal.Body>
                    <form className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">{dict.companyName}</label>
                            <input {...register('nome_empresa', { required: true })}
                                className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent ' />
                            {errors.nome_empresa && <span className="text-red-500 text-xs mt-1">{dict.companyNameRequired}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">{dict.dateInit}</label>
                            <Controller
                                name="data_inicio"
                                control={control}
                                render={({ field }) =>
                                    <DatePicker
                                        selected={field.value}
                                        onChange={(date) => setValue('data_inicio', date)}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        className='text-base py-2.5 px-0 w-full text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                    />
                                }
                                rules={{
                                    required: { value: true, message: dict.insertStartDate },
                                    validate: validateData
                                }}
                            />
                            {/*@ts-ignore*/}
                            {errors.data_inicio && <p className="text-red-500 text-xs mt-1">{errors.data_inicio.message?.toString()}</p>}

                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">{dict.dateEnd}</label>
                            <div className="flex flex-row-reverse md:gap-5 flex-wrap-reverse md:flex-nowrap justify-end">
                                <div className='flex flex-row items-center gap-1'>
                                    <input
                                        id='moment'
                                        type="checkbox"
                                        className=''
                                        checked={isCheckboxChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="moment" className='text-gray-500 dark:text-gray-300 whitespace-nowrap'>{dict.untilMoment}</label>
                                </div>

                                <Controller
                                    name="data_fim"
                                    rules={{
                                        validate: (value) => {
                                            const selectedDate = new Date(value);
                                            const minimumDate = new Date('1900-01-01');
                                            const today = new Date();

                                            if (selectedDate < minimumDate) {
                                                return dict.minimumAllowedYear;
                                            }
                                            if (selectedDate > today) {
                                                return dict.dateNotGreaterThanToday;
                                            }
                                            return true;
                                        }
                                    }}
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => setValue('data_fim', date)}
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            className='text-base py-2.5 px-0 w-max text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                        />
                                    )}
                                />
                            </div>
                            {/*@ts-ignore*/}
                            {errors.data_fim && <p className="text-red-500 text-xs mt-1">{errors.data_fim.message?.toString()}</p>}

                        </div>

                        <div className='flex flex-col'>
                            <label className="text-gray-500 dark:text-gray-300">{dict.historicDescription}</label>
                            <textarea
                                className='text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent'
                                {...register('descricao')} />
                        </div>
                        {erro && <p className="text-red-500 text-xs mt-1">{erro}</p>}
                    </form>

                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button onClick={() => handleSubmit(onSubmit)()}>{dict.confirmHistoric}</Button>
                    <Button color="gray" onClick={cancelar}>
                        {dict.cancelHistoric}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
