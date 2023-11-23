
"use client";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";
import { useCallback, useContext, useEffect, useState } from "react";
import { HiBell } from "react-icons/hi2";
import { Notification } from "../(compositions)/(notification)";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { NotificationContext } from "./NotificationContext";
import { useRouter } from "next/navigation";
import { acceptAssociationAPI, acceptConnectionAPI, acceptVisitAPI, getNotificationsAPI, refuseAssociationAPI, refuseConnectionAPI, refuseVisitAPI, updateNotificationsAPI, } from "./navbarUtils";
import { clientSupabase } from "lib/utils/clientSupabase";

interface NotificationDropdownProps {
    textos: Navbarbuttons;
    userId: string;
}

export default function NotificationDropdown({ textos, userId }: NotificationDropdownProps) {
    const [notBellClicked, setNotBellClicked] = useState<boolean>(false)
    const [notification, setNotification] = useState<boolean>(false)

    const { notificationList, toggleNotificationList } = useContext(NotificationContext)
    const [newNot, setNewNot] = useState<any[]>([])
    const [oldNot, setOldNot] = useState<any[]>([])

    const supabase = clientSupabase()
    const router = useRouter()

    const getNotifications = useCallback(async (userId: string) => {
        const result = await getNotificationsAPI(userId, supabase)
        if (result) {
            toggleNotificationList(result)
        }
    },[supabase, toggleNotificationList])
    
    const atualizaNotificacoes = async (itemId: string, userId: string) => {
        const result = await updateNotificationsAPI(itemId, userId, supabase)
        if (result) {
            await getNotifications(userId)
            checkNotSymbol()
        }
    }

    const checkNotSymbol = useCallback(() => {
        let checkNewNot: any[] = []
        let checkOldNot: any[] = []
        notificationList.map((item: any) => {
            if (item.visualizada == false) {
                checkNewNot.push(item)
            }
            else {
                checkOldNot.push(item)
            }
        })
        setNewNot(checkNewNot)
        setOldNot(checkOldNot)
        if (newNot.length > 0) {
            setNotification(true)
        }
        else {
            setNotification(false)
        }
    },[newNot.length, notificationList])

    useEffect(() => {
        checkNotSymbol()
    }, [checkNotSymbol, notificationList])

    useEffect(() => {
        if (newNot.length > 0) {
            setNotification(true)
        }
        else {
            setNotification(false)
        }
    }, [newNot])

    useEffect(() => {
        getNotifications(userId)
        const subscription = supabase.channel("Notification_changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notificacao",
                    filter: `iddestinatario=eq.${userId}`
                },
                () => {
                    getNotifications(userId)
                }
            )
            .subscribe();
        return () => {
            subscription.unsubscribe();
        }
    }, [getNotifications, supabase, userId])

    useEffect(() => {
        const subscription = supabase.channel("Notification_updates")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "notificacao",
                    filter: `iddestinatario=eq.${userId}`
                },
                () => {
                    getNotifications(userId)
                }
            )
            .subscribe();
        return () => {
            subscription.unsubscribe();
        }
    }, [getNotifications, supabase, userId])

    const aceitarAssociacao = async (itemId: string) => {
        const result = await acceptAssociationAPI(itemId, supabase)
        if(result) {
            atualizaNotificacoes(itemId, userId)
        }
    }

    const recusarAssociacao = async (itemId: string) => {
        const result = await refuseAssociationAPI(itemId, supabase)
        if(result) {
            atualizaNotificacoes(itemId, userId)
        }
    }

    const aceitarConexao = async (itemId: string) => {
        const result = await acceptConnectionAPI(itemId, supabase)
        if(result) {
            atualizaNotificacoes(itemId, userId)
        }
    }

    const recusarConexao = async (itemId: string) => {
        const result = await refuseConnectionAPI(itemId, supabase)
        if(result) {
            atualizaNotificacoes(itemId, userId)
        }
    }

    const visualizarVisita = (idvisita: string) => {
        router.push(`/agenda`)
        atualizaNotificacoes(idvisita, userId)
    }
    const visualizarVisitaSemAtualizar = () => {
        router.push(`/agenda`)
    }

    const aceitaVisita = async (idvisita: string) => {
        const result = await acceptVisitAPI(idvisita, supabase)
        if(result) {
            atualizaNotificacoes(idvisita, userId)
        }
    }

    const recusaVisita = async (idvisita: string) => {
        const result = await refuseVisitAPI(idvisita, supabase)
        if(result) {
            atualizaNotificacoes(idvisita, userId)
        }
    }

    return (
        <div className="relative">
            <button onClick={e => { setNotBellClicked(!notBellClicked) }} className={`flex flex-col justify-center items-center p-0 w-auto rounded border-0 ${notBellClicked ? 'text-blue-700 dark:text-blue-700' : 'text-gray-900 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 dark:text-white dark:hover:bg-transparent'}`}>
                <HiBell size={30} />
                <p className="hidden md:block md:text-sm">{textos.notifications}</p>
                {
                    notification && ( // Verifica se há notificações antes de exibir a bolinha
                        <span className="absolute top-0 right-0 md:top-0 md:right-6 h-3 w-3 bg-orange-600 rounded-full"></span>
                    )
                }
            </button>
            <div className={`fixed md:absolute top-16 w-screen md:w-auto md:h/3-5 z-50 left-0 right-0 md:-left-52 md:-right-52 flex items-center justify-center ${notBellClicked ? 'block' : 'hidden'}`}>
                <div className="z-20 w-screen md:w-auto h-[calc(100vh-72px)] md:h-3/6 md:min-w-full md:max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-dark-100 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                        {textos.notifications}
                    </div>
                    <div className="flex flex-col max-h-screen md:max-h-96 divide-y divide-gray-100 dark:divide-gray-700 overflow-y-auto">
                        {
                            newNot.length > 0 &&
                            newNot.map((item: any) => {
                                switch (item.tipo) {
                                    case 'associacao':
                                        return (
                                            <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.association} date={item.data} />
                                                <Notification.Actions visualizada={item.visualizada} action1={e => aceitarAssociacao(item.artefato)} action2={e => recusarAssociacao(item.artefato)} texto={textos.notificationlabels} type={'yesno'} />
                                            </Notification.Root>
                                        )
                                    case 'conexao':
                                        return (
                                            <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.connection} date={item.data} />
                                                <Notification.Actions visualizada={item.visualizada} action1={e => aceitarConexao(item.artefato)} action2={e => recusarConexao(item.artefato)} texto={textos.notificationlabels} type={'yesno'} />
                                            </Notification.Root>
                                        )
                                    case 'novavisita':
                                        return (
                                            <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.visit} date={item.data} />
                                                <Notification.Actions visualizada={item.visualizada} action1={e => aceitaVisita(item.artefato)} action2={e => recusaVisita(item.artefato)} action3={e => visualizarVisitaSemAtualizar()} texto={textos.notificationlabels} type={'both'} />
                                            </Notification.Root>
                                        )
                                    case 'visitacancelada':
                                        return (
                                            <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.refusedvisit} date={item.data} />
                                                <Notification.Actions visualizada={item.visualizada} action1={e => visualizarVisita(item.artefato)} texto={textos.notificationlabels} type={'check'} />
                                            </Notification.Root>
                                        )
                                    case 'visitaaceita':
                                        return (
                                            <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.acceptedvisit} date={item.data} />
                                                <Notification.Actions visualizada={item.visualizada} action1={e => visualizarVisita(item.artefato)} texto={textos.notificationlabels} type={'check'} />
                                            </Notification.Root>
                                        )
                                    case 'visitaatualizada':
                                        return (
                                            <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.updatedvisit} date={item.data} />
                                                <Notification.Actions visualizada={item.visualizada} action1={e => visualizarVisita(item.artefato)} texto={textos.notificationlabels} type={'check'} />
                                            </Notification.Root>
                                        )
                                }
                            })
                        }
                        {
                            oldNot.length > 0 ?
                                oldNot.map((item: any) => {
                                    switch (item.tipo) {
                                        case 'associacao':
                                            return (
                                                <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                    <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.association} date={item.data} />
                                                    <Notification.Actions visualizada={item.visualizada} action1={e => aceitarAssociacao(item.artefato)} action2={e => recusarAssociacao(item.artefato)} texto={textos.notificationlabels} type={'yesno'} />
                                                </Notification.Root>
                                            )
                                        case 'conexao':
                                            return (
                                                <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                    <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.connection} date={item.data} />
                                                    <Notification.Actions visualizada={item.visualizada} action1={e => aceitarConexao(item.artefato)} action2={e => recusarConexao(item.artefato)} texto={textos.notificationlabels} type={'yesno'} />
                                                </Notification.Root>
                                            )
                                        case 'novavisita':
                                            return (
                                                <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                    <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.visit} date={item.data} />
                                                    <Notification.Actions visualizada={item.visualizada} action1={e => aceitaVisita(item.artefato)} action2={e => recusaVisita(item.artefato)} action3={e => visualizarVisitaSemAtualizar()} texto={textos.notificationlabels} type={'both'} />
                                                </Notification.Root>
                                            )
                                        case 'visitacancelada':
                                            return (
                                                <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                    <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.refusedvisit} date={item.data} />
                                                    <Notification.Actions visualizada={item.visualizada} action1={e => visualizarVisita(item.artefato)} texto={textos.notificationlabels} type={'check'} />
                                                </Notification.Root>
                                            )
                                        case 'visitaaceita':
                                            return (
                                                <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                    <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.acceptedvisit} date={item.data} />
                                                    <Notification.Actions visualizada={item.visualizada} action1={e => visualizarVisita(item.artefato)} texto={textos.notificationlabels} type={'check'} />
                                                </Notification.Root>
                                            )
                                        case 'visitaatualizada':
                                            return (
                                                <Notification.Root key={item.id} visualizada={item.visualizada}>
                                                    <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.updatedvisit} date={item.data} />
                                                    <Notification.Actions visualizada={item.visualizada} action1={e => visualizarVisita(item.artefato)} texto={textos.notificationlabels} type={'check'} />
                                                </Notification.Root>
                                            )
                                    }
                                })
                                :
                                <div className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <div className="w-full text-center justify-center align-center">
                                        <span>{textos.notificationlabels.nonotifications}</span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
