"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowNarrowRight } from "react-icons/hi";
import SetEmail from "./SetEmail";
import SetSenha from "./SetSenha";
import SetTelefone from "./SetTelefone";
import { Database } from "../../../../../lib/database.types";
import { setTelefones } from "../../../../../lib/utils/editProfile";

interface CardConfigProps {
    title: string
    email: string;
    type: string;
    telefones: any;
    id: string;
}

export default function CardConfig({ title, email, type, telefones, id }: CardConfigProps) {
    const supabase = createClientComponentClient<Database>({});

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
            const { data, error } = await supabase.auth.updateUser({
                email: formData.email,
            });

            if (error) {
                setError("Erro ao atualizar email")
            } else {
                setSucess("Email atualizado, confirme em sua caixa de entrada")
                setTimeout(() => {
                    setSucess(undefined)
                    props.setOpenModal(undefined)
                }, 3000)
            }

        } else if (title == "Senha") {
            const { data, error } = await supabase.auth.updateUser({
                password: formData.senha,
            });

            if (error) {
                console.log(error)
                setError("Erro ao atualizar senha")
            } else {
                setSucess("Senha atualizada")
                setTimeout(() => {
                    setSucess(undefined)
                    props.setOpenModal(undefined)
                }, 3000)
            }

        } else {
            const { error} = await setTelefones(type, formData, id)

            if(error){
                setError("Erro ao atualizar telefones")
                setTimeout(() => {
                    setError(undefined)
                }, 3000);
            }else{
                setSucess("Telefones Atualizados com sucesso")
                setTimeout(() => {
                    setSucess(undefined)
                    props.setOpenModal(undefined)
                }, 3000);
            }
        }
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
                    {title}
                </p>
                <HiArrowNarrowRight />
            </div>

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>{"Editar " + title}</Modal.Header>
                <Modal.Body>
                    {title == "Email" && <SetEmail register={register} errors={errors} />}
                    {title == "Senha" && <SetSenha register={register} errors={errors} watch={watch} />}
                    {title == "Telefones" && <SetTelefone register={register} errors={errors} type={type} />}
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    {sucess && <p className="text-green-500 text-xs mt-1">{sucess}</p>}
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    <Button disabled={!isDirty} isProcessing={isProcessing} onClick={() => handleSubmit(onSubmit)()}>Confirmar Alterações</Button>
                    <Button color="gray" onClick={handleCancel} >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
