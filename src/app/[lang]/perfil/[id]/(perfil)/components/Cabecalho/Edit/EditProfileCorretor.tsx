"use client";

import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Button, Modal } from 'flowbite-react';
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { Corporacao, Corretor } from "../../../../../../../../../lib/modelos";
import { updateCorretorProfile } from "../../../../../../../../../lib/utils/editProfile";
import EditEspecialidades from "./EditEspecialidades";
import { useRouter } from "next/navigation";
import EditRegiaoAtuacao from "./EditRegiaoAtuacao";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../../../../lib/database.types";
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";

interface EditProfileProps {
    data: Corretor | null;
}

async function getImoveis() {
    const supabase = createClientComponentClient<Database>({});

    let { data: tipoImovel } = await supabase
        .from("tipoImovel")
        .select("id,descricao");

    return { tipoImovel };
}

export default function EditProfile({ data }: EditProfileProps) {
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
        const { updatedData, error } = await updateCorretorProfile(formData, data?.id!)
        if (error) {
            console.error('Erro ao atualizar os dados:', error);
        } else {
            console.log('Dados atualizados com sucesso:', updatedData);
            reset(getValues())
            props.setOpenModal(undefined);
            router.refresh()
        }
        setIsProcessing(false)

    }

    useEffect(() => {
        const fetchData = async () => {
            const imoveis = await (await getImoveis()).tipoImovel
            setImoveis(imoveis)
        }
        fetchData()
    }, [])

    const watchCep = watch("cep")

    useEffect(() => {
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
    }, [watchCep]);


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
            return "CEP incompleto";
        }
        if (errorCep) {
            return "Esse CEP não existe"
        }
        return true;
    };



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
                            <label className="text-gray-500 dark:text-gray-300">Nome</label>
                            <input type="text"
                                {...register("nome", { required: true })}
                                className={`text-base py-2.5 px-0 w-full text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent `} />
                            {errors?.nome?.type == 'required' && <p className="text-red-500 text-xs mt-1">É preciso inserir um nome</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-500 dark:text-gray-300">Sobre</label>
                            <textarea
                                {...register("sobre")}
                                placeholder="Conte um pouco sobre você"
                                cols={30}
                                rows={2}
                                className="py-2.5 px-0 w-full text-base text-gray-900   border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer bg-transparent"></textarea>
                        </div>

                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <EditEspecialidades props={dropdown} imoveis={imoveis}/>
                            <EditRegiaoAtuacao props={dropdown} />
                        </div>

                        <h2 className="font-medium text-gray-500 dark:text-gray-400">Localidade</h2>

                        {/* comercial & { cep & UF } */}
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="grid md:grid-cols-2 md:gap-6">
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
                                        className={`bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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
                        <div className="grid md:grid-cols-2 md:gap-6 mt-0 space-y-4 md:space-y-0">
                            <div className="relative z-0 w-full group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    cidade
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    {...register("cidade", { required: true })}
                                    className={`bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {/*  {errors?.cidade?.type == 'required' && (<label className="text-red-500 text-xs">
                                    erro
                                </label>)} */}
                            </div>
                            <div className="relative z-0 w-full">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    bairro
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    {...register("bairro", { required: true })}
                                    className={`bg-transparent disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {/* {errors?.bairro?.type == 'required' && (<label className="text-red-500 text-xs">
                                    erro
                                </label>)} */}
                            </div>
                        </div>

                        {/* rua */}
                        <div className="relative z-0 w-full mb-6 group">
                            <label className="text-sm text-gray-500 dark:text-gray-300">
                                Rua
                            </label>
                            <input
                                type="text"
                                disabled
                                {...register("logradouro", { required: true })}
                                className={`bg-transparent  disabled:opacity-75 block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                            />
                            {/* {errors?.logradouro?.type == 'required' && (<label className="text-red-500 text-xs">
                                erro
                            </label>)} */}
                        </div>

                        {/* numero & complemento */}
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    numero
                                </label>
                                <input
                                    {...register("numero", { required: true })}
                                    type="number"
                                    className={`bg-transparent  block py-2.5 px-0 w-full text-sm text-gray-900  border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                                />
                                {errors?.numero?.type == 'required' && (<label className="text-red-500 text-xs">
                                    Insira um número
                                </label>)}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <label className="text-sm text-gray-500 dark:text-gray-300">
                                    complemento
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
                    <Button disabled={!isDirty} isProcessing={isProcessing} onClick={() => handleSubmit(onSubmit)()}>Confirmar Alterações</Button>
                    <Button color="gray" onClick={handleCancel} >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
