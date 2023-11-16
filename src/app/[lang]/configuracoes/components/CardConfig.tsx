"use client";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowNarrowRight } from "react-icons/hi";
import SetEmail from "./SetEmail";
import SetSenha from "./SetSenha";
import SetTelefone from "./SetTelefone";
import { setTelefones } from "../configUtils";
import { clientSupabase } from "lib/utils/clientSupabase";
import { emailChangeAPI, passwordChangeAPI } from "../configUtils";
import toast from 'react-hot-toast';
import { Dictionaries } from "@/app/i18n/dictionaries/types";

interface CardConfigProps {
    title: string
    email: string;
    type: string;
    telefones: any;
    id: string;
    dict: Dictionaries;
}

export default function CardConfig({ dict, title, email, type, telefones, id }: CardConfigProps) {
    const supabase = clientSupabase();

    const defaultValues = type == "corretor" ? {
        email: email,
        senha: "",
        cofirma_senha: "",
        telefone: telefones.telefone,
        celular: telefones.celular,
        telefone_comercial: telefones.comercial,
    } : {
        email: email,
        senha: "",
        cofirma_senha: "",
        telefone_1: telefones.telefone1,
        telefone_2: telefones.telefone2,
        telefone_3: telefones.telefone3,
    }

    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };

    useEffect(() => {
        setError(undefined)
        setSucess(undefined)
    }, [openModal])

    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const [sucess, setSucess] = useState<string | undefined>(undefined)

    const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors, isDirty } } = useForm({ defaultValues });

    const onSubmit = async (formData: any) => {
        setIsProcessing(true)
        if (title == "Email") {
            const result = await emailChangeAPI(formData.email, id, supabase)
            if (result) {
                toast.success("Email atualizado, confirme em sua caixa de entrada")
                setTimeout(() => {
                    setSucess(undefined)
                    props.setOpenModal(undefined)
                }, 3000)
            }
            else {
                toast.error("Erro ao atualizar email. Tente novamente mais tarde.")
            }

        } else if (title == "Senha") {
            const result = await passwordChangeAPI(formData.password, supabase)
            if (result) {
                toast.success("Senha atualizada")
            }
            else {
                toast.error("Erro ao atualizar senha")
            }

        } else {
            const result = await setTelefones(type, formData, id, supabase)

            if (result) {
                toast.success("Telefones Atualizados com sucesso")
            } else {
                toast.error("Erro ao atualizar telefones")
            }
        }
        props.setOpenModal(undefined)
        setIsProcessing(false)
    }

    const handleCancel = async (formData: any) => {
        reset(defaultValues)
        props.setOpenModal(undefined)
    }

    return (
        <>
            <div onClick={() => props.setOpenModal('default')} className="h-12 bg-branco hover:bg-gray-400 dark:bg-dark-300 rounded-md flex items-center justify-between p-3 cursor-pointer dark:hover:bg-dark-100">
                <p>
                    {title == "1" && dict.configurations.email}
                    {title == "2" && dict.configurations.password}
                    {title == "3" && dict.configurations.phone}
                </p>
                <HiArrowNarrowRight />
            </div>

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>
                    {dict.configurations.edit} {" "}
                    {title == "1" && dict.configurations.email}
                    {title == "2" && dict.configurations.password}
                    {title == "3" && dict.configurations.phone}
                </Modal.Header>
                <Modal.Body>
                    {title == "1" && <SetEmail register={register} errors={errors} />}
                    {title == "2" && <SetSenha register={register} errors={errors} watch={watch} pass={dict.configurations.password} confirm={dict.configurations.confirmPassword}/>}
                    {title == "3" && <SetTelefone register={register} errors={errors} type={type} tel={dict.configurations.phone} cel={dict.configurations.cellphone} com={dict.configurations.comercial}/>}
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button disabled={!isDirty} isProcessing={isProcessing} onClick={() => handleSubmit(onSubmit)()}>{dict.configurations.confirmChange}</Button>
                    <Button color="gray" onClick={handleCancel} >
                        {dict.configurations.cancelChange}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
