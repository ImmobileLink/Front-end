"use client";

import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Button, Modal } from 'flowbite-react';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { Corretor } from "../../../../../../../../../lib/modelos";
import { getImoveis, updateCorretorProfile } from "../../../../perfilUtils/EditProfile";
import EditEspecialidades from "./EditEspecialidades";
import { useRouter } from "next/navigation";
import EditRegiaoAtuacao from "./EditRegiaoAtuacao";
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";
import { clientSupabase } from "lib/utils/clientSupabase";
import toast from "react-hot-toast";

interface EditProfileProps {
    data: Corretor | null;
}



export default function EditProfile({ data }: EditProfileProps) {
    const supabase = clientSupabase();
    const dict = useProfileStore.getState().dict!.profile

    const router = useRouter()
    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    const [dropdownTipos, setDropdownTipos] = useState<boolean>(false); //vai reger esse dropdown de tipos de imóveis
    const [dropdownRegiao, setDropdownRegiao] = useState<boolean>(false); //vai reger esse dropdown de regioes de atuacao
    const dropdown = { dropdownTipos, setDropdownTipos, dropdownRegiao, setDropdownRegiao }

    const [errorCep, setErrorCep] = useState<string | undefined>()

    const corretor = useProfileStore.getState().profileFullData as Corretor

    const defaultValues = {
        nome: corretor.nome,
        sobre: data?.sobre,
        cep: data?.cep,
        cidade: data?.cidade,
        bairro: data?.bairro,
        logradouro: data?.logradouro,
        numero: data?.numero,
        complemento: data?.complemento,
        uf: data?.estado
    }

    const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors, isDirty } } = useForm({ defaultValues });

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [imoveis, setImoveis] = useState<{ id: any; descricao: any }[] | null>([])

    const onSubmit = async (formData: any) => {
        setIsProcessing(true)
        const result = await updateCorretorProfile(formData, data?.id!, supabase)
        if (!result) {
            toast.error(dict.editProfile.warn.errorUpdatingData)
        } else {
            toast.success(dict.editProfile.warn.dataUpdatedSuccessfully)
            reset(getValues())
            props.setOpenModal(undefined);
            router.refresh()
        }
        setIsProcessing(false)

    }

    useEffect(() => {
        const fetchData = async () => {
            const imoveis = await (await getImoveis(supabase)).tipoImovel
            setImoveis(imoveis)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const watchCep = watch("cep")

    useEffect(() => {
        const autoCompletaEndereco = async (cleanedCep: string) => {
            const data = await getCEP(cleanedCep);
            console.log(data)
            if (!data.erro) {
                setErrorCep(undefined)
                setValue('cidade', data.localidade);
                setValue('uf', data.uf);
                setValue('bairro', data.bairro);
                setValue('logradouro', data.logradouro);
                setValue('numero', null);
                setValue('complemento', '');

            } else {
                setValue('cidade', '');
                setValue('bairro', '');
                setValue('uf', '');
                setValue('logradouro', '');
                setErrorCep("Esse cep não existe")
            }
        };
        const cleanedCep = watchCep?.replace(/\D/g, '');
        if (cleanedCep?.length == 8) {
            if (watchCep != defaultValues.cep) {
                autoCompletaEndereco(cleanedCep);
            } else {
                reset({
                    nome: getValues().nome,
                    sobre: getValues().sobre,
                    uf: defaultValues.uf,
                    cep: defaultValues.cep,
                    cidade: defaultValues.cidade,
                    bairro: defaultValues.bairro,
                    logradouro: defaultValues.logradouro,
                    numero: defaultValues.numero,
                    complemento: defaultValues.complemento,
                });
            }
        }
    }, [defaultValues.bairro, defaultValues.cep, defaultValues.cidade, defaultValues.complemento, defaultValues.logradouro, defaultValues.numero, defaultValues.uf, getValues, reset, setValue, watchCep]);

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
            return dict.editProfile.warn.incompleteCEP;
        }
        if (errorCep) {
            return dict.editProfile.warn.nonexistentCEP;
        }
        return true;
    };

    return (
        <>
            <button onClick={() => props.setOpenModal('default')}>
                <AiFillEdit size={30} />
            </button>

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>{dict.editProfile.edit}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-5 sm:mx-auto sm:w-full sm:max-w-sm text-sm" >
                        <div className="flex flex-col">
                            <label className="text-gray-500 dark:text-gray-300">{dict.editProfile.name}</label>
                            <input type="text"
                                {...register("nome", { required: {value: true, message:dict.editProfile.warn.insertName }, minLength: {value: 5, message: dict.editProfile.warn.minLengthName}})}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `} />
                            {errors?.nome?.message && <p className="text-red-500 text-xs mt-1">{errors?.nome?.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-500 dark:text-gray-300">{dict.editProfile.about}</label>
                            <textarea
                                {...register("sobre")}
                                placeholder="Conte um pouco sobre você"
                                cols={30}
                                rows={2}
                                className="py-2.5 px-0 w-full text-base text-gray-900   border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent"></textarea>
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <EditEspecialidades props={dropdown} imoveis={imoveis} />
                            <EditRegiaoAtuacao props={dropdown} />
                        </div>

                        <h2 className="font-medium text-gray-500 dark:text-gray-400">{dict.editProfile.localization}</h2>

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

                                <div className="z-0 group">
                                    <label className="text-sm text-gray-500 dark:text-gray-300">
                                        UF
                                    </label>
                                    <input
                                        disabled
                                        type="text"
                                        {...register("uf", { required: true })}
                                        className={`cursor-not-allowed bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="md:justify-end w-full flex">
                            <label className="text-red-500 text-xs mb-8">
                                err
                            </label>
                        </div> */}

                        {/* cidade & bairro */}
                        <div className="grid md:grid-cols-2 md:gap-6 gap-3">
                            <div className="relative z-0 w-full group ">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.editProfile.city}
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    {...register("cidade", { required: true })}
                                    className={`cursor-not-allowed bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {/*  {errors?.cidade?.type == 'required' && (<label className="text-red-500 text-xs">
                                    erro
                                </label>)} */}
                            </div>
                            <div className="relative z-0 w-full">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.editProfile.neighborhood}
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    {...register("bairro", { required: true })}
                                    className={`cursor-not-allowed bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {/* {errors?.bairro?.type == 'required' && (<label className="text-red-500 text-xs">
                                    erro
                                </label>)} */}
                            </div>
                        </div>

                        {/* rua */}
                        <div className="relative z-0 w-full md:gap-6 gap-3">
                            <label className="text-sm text-gray-500 dark:text-gray-300">
                                {dict.editProfile.street}
                            </label>
                            <input
                                type="text"
                                disabled
                                {...register("logradouro", { required: true })}
                                className={`cursor-not-allowed bg-transparent  disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            />
                            {/* {errors?.logradouro?.type == 'required' && (<label className="text-red-500 text-xs">
                                erro
                            </label>)} */}
                        </div>

                        {/* numero & complemento */}
                        <div className="grid md:grid-cols-2 md:gap-6 gap-3">
                            <div className="relative z-0 w-full group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.editProfile.number}
                                </label>
                                <input
                                    {...register("numero", { required: true })}
                                    type="number"
                                    className={`bg-transparent  block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {errors?.numero?.type == 'required' && (<label className="text-red-500 text-xs">
                                    {dict.editProfile.warn.insertNumber}
                                </label>)}
                            </div>
                            <div className="relative z-0 w-full">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    {dict.editProfile.complement}
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
                    <Button disabled={!isDirty} isProcessing={isProcessing} onClick={() => handleSubmit(onSubmit)()}>{dict.editProfile.confirm}</Button>
                    <Button color="gray" onClick={handleCancel} >
                        {dict.editProfile.cancel}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
