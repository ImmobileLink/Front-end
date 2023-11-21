"use client";

import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Button, Modal } from 'flowbite-react';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { Corporacao, Corretor } from "../../../../../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../../lib/database.types";
import { updateCorporacaoProfile } from "../../../../perfilUtils/EditProfile";
import { useRouter } from "next/navigation";
import EditRegiaoAtuacao from "./EditRegiaoAtuacao";
import { clientSupabase } from "lib/utils/clientSupabase";
import { useProfileStore } from "lib/store/profileStore";
import toast from "react-hot-toast";

interface EditProfileProps {
    data: Corporacao | null;
}

export default function EditProfile({ data }: EditProfileProps) {
    const supabase = clientSupabase()
    const router = useRouter()
    const dict = useProfileStore.getState().dict!.profile.editProfile

    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    const [dropdownTipos, setDropdownTipos] = useState<boolean>(false); //vai reger esse dropdown de tipos de imóveis
    const [dropdownRegiao, setDropdownRegiao] = useState<boolean>(false); //vai reger esse dropdown de regioes de atuacao
    const dropdown = { dropdownTipos, setDropdownTipos, dropdownRegiao, setDropdownRegiao }

    const [errorCep, setErrorCep] = useState<string | undefined>()

    const defaultValues = {
        nomefantasia: data?.nomefantasia,
        sobre: data?.sobre,
        cep: data?.cep,
        site: data?.site,
        cidade: data?.cidade,
        bairro: data?.bairro,
        logradouro: data?.logradouro,
        numero: data?.numero,
        complemento: data?.complemento,
        uf: data?.estado
    }

    const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors, isDirty } } = useForm({ defaultValues });


    const [isProcessing, setIsProcessing] = useState<boolean>(false)

    const onSubmit = async (formData: any) => {
        setIsProcessing(true)
        const { updatedData, error } = await updateCorporacaoProfile(formData, data?.id!, supabase)
        if (error) {
            toast.error(dict.warn.errorUpdatingData)
        } else {
            toast.success(dict.warn.dataUpdatedSuccessfully)
            props.setOpenModal(undefined);
            router.refresh()
        }
        setIsProcessing(false)

    }

    const watchCep = watch("cep")

    useEffect(() => {
        const cleanedCep = watchCep?.replace(/\D/g, '');
        if (cleanedCep?.length == 8) {
            if (watchCep != defaultValues.cep) {
                autoCompletaEndereco(cleanedCep);
            } else {
                reset({
                    nomefantasia: getValues().nomefantasia,
                    sobre: getValues().sobre,
                    uf: defaultValues.uf,
                    cep: defaultValues.cep,
                    cidade: defaultValues.cidade,
                    bairro: defaultValues.bairro,
                    logradouro: defaultValues.logradouro,
                    numero: defaultValues.numero,
                    complemento: defaultValues.complemento,
                    site: defaultValues.site,
                });
            }
        }
    }, [watchCep]);


    const autoCompletaEndereco = async (cleanedCep: string) => {
        const data = await getCEP(cleanedCep);

        if (!data.erro) {
            setErrorCep(undefined)
            setValue('cidade', data.localidade);
            setValue('uf', data.uf);
            setValue('bairro', data.bairro);
            setValue('logradouro', data.logradouro);
            setValue('site', data.site);
            setValue('numero', null);
            setValue('complemento', '');
        } else {
            setValue('cidade', '');
            setValue('uf', '');
            setValue('bairro', '');
            setValue('logradouro', '');
            setErrorCep(dict.warn.nonexistentCEP)
        }
    };

    const getCEP = async (cep: string) => {
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await res.json();
            return data;
        } catch (error) {
            return false;
        }
    };

    const handleCancel = () => {
        props.setOpenModal(undefined)
        reset(defaultValues);
    };

    const validateCep = (value: any) => {
        const cleanedCep = value?.replace(/\D/g, '');
        if (cleanedCep.length != 8) {
            return dict.warn.incompleteCEP;
        }
        if (errorCep) {
            return dict.warn.nonexistentCEP;
        }
        return true;
    };



    return (
        <>
            <button onClick={() => props.setOpenModal('default')}>
                <AiFillEdit size={30} />
            </button>

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>{dict.edit}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-5 sm:mx-auto sm:w-full sm:max-w-sm text-sm" >
                        <div className="flex flex-col">
                            <label className="text-gray-500 dark:text-gray-300">{dict.corporationName}</label>
                            <input type="text"
                                {...register("nomefantasia", { required: {value: true, message:dict.warn.insertName }, minLength: {value: 5, message: dict.warn.minLengthName}})}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `} />
                            {errors?.nomefantasia?.message && <p className="text-red-500 text-xs mt-1">{errors?.nomefantasia?.message}</p>}
                        </div>



                        <div className="flex flex-col">
                            <label className="text-gray-500 dark:text-gray-300">{dict.about}</label>
                            <textarea
                                {...register("sobre")}
                                cols={30}
                                rows={2}
                                className="py-2.5 px-0 w-full text-base text-gray-900   border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent"></textarea>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-500 dark:text-gray-300">{dict.site}</label>
                            <input type="text"
                                {...register("site")}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `} />
                            {/* {errors?.site?.type == 'required' && <p className="text-red-500 text-xs mt-1">Insira um endereço válido</p>} */}
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <EditRegiaoAtuacao props={dropdown} />
                        </div>

                        <h2 className="font-medium text-gray-500 dark:text-gray-400">{dict.localization}</h2>

                        {/* comercial & { cep & UF } */}
                        <div className="grid md:grid-cols-2">
                            <div className="grid md:grid-cols-2 md:gap-6 gap-3">
                                <div className="relative z-0 w-full ">
                                    <label className="text-sm text-gray-500 dark:text-gray-300">
                                        CEP
                                    </label>
                                    <InputMask
                                        type="text"
                                        mask={'99999-999'}
                                        {...register("cep", { required: 'CEP é obrigatório', validate: validateCep })}
                                        className={`bg-transparent block py-2.5  px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    />
                                    {errors?.cep && (<label className="text-red-500 text-xs">
                                        {errors.cep.message}
                                    </label>)}

                                </div>

                                <div className="z-0">
                                    <label className="text-sm text-gray-500 dark:text-gray-300">
                                        UF
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        {...register("uf", { required: true })}
                                        className={`cursor-not-allowed  bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* cidade & bairro */}
                        <div className="grid md:grid-cols-2 md:gap-6 gap-3">
                            <div className="relative z-0 w-full group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.city}
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    {...register("cidade", { required: true })}
                                    className={`cursor-not-allowed  bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {/*  {errors?.cidade?.type == 'required' && (<label className="text-red-500 text-xs">
                                    erro
                                </label>)} */}
                            </div>
                            <div className="relative z-0 w-full">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.neighborhood}
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    {...register("bairro", { required: true })}
                                    className={`cursor-not-allowed  bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {/* {errors?.bairro?.type == 'required' && (<label className="text-red-500 text-xs">
                                    erro
                                </label>)} */}
                            </div>
                        </div>

                        {/* rua */}
                        <div className="relative z-0 w-full md:gap-6 gap-3 group">
                            <label className="text-sm text-gray-500 dark:text-gray-300">
                                {dict.street}
                            </label>
                            <input
                                type="text"
                                disabled
                                {...register("logradouro", { required: true })}
                                className={`cursor-not-allowed  bg-transparent  disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            />
                            {/* {errors?.logradouro?.type == 'required' && (<label className="text-red-500 text-xs">
                                erro
                            </label>)} */}
                        </div>

                        {/* numero & complemento */}
                        <div className="grid md:grid-cols-2 md:gap-6 gap-3">
                            <div className="relative z-0 w-full group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.number}
                                </label>
                                <input
                                    {...register("numero", { required: true })}
                                    type="number"
                                    className={`bg-transparent  block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {errors?.numero?.type == 'required' && (<label className="text-red-500 text-xs">
                                    {dict.warn.insertNumber}
                                </label>)}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.complement}
                                </label>
                                <input
                                    type="text"
                                    {...register("complemento")}
                                    className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button disabled={!isDirty} isProcessing={isProcessing} onClick={() => handleSubmit(onSubmit)()}>{dict.confirm}</Button>
                    <Button color="gray" onClick={handleCancel} >
                        {dict.cancel}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
