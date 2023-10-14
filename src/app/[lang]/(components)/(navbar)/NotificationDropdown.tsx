
"use client";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";
import { useContext, useEffect, useState } from "react";
import { HiBell } from "react-icons/hi2";
import { Notification } from "../(compositions)/(notification)";
import NotificationIcon from "../(compositions)/(notification)/NotificationIcon";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { NotificationContext } from "./NotificationContext";

interface NotificationDropdownProps {
    textos: Navbarbuttons;
    userId: string;
}

export default function NotificationDropdown({ textos, userId }: NotificationDropdownProps) {
    const [notBellClicked, setNotBellClicked] = useState<boolean>(false)
    const [notification, setNotification] = useState<boolean>(false)

    const { assocNot, toggleAssocNot } = useContext(NotificationContext)
    const supabase = createClientComponentClient<Database>()

    const checkNotSymbol = () => {
        if (assocNot.length > 0) {
            setNotification(true)
        }
        else {
            setNotification(false)
        }
    }

    const getNotifications = async (idusuario: string) => {
        const { data, error } = await supabase
            .from('notificacao')
            .select('*')
            .eq('iddestinatario', idusuario)
            .eq('visualizada', 'false')
        if (error) {
            console.log(error)
        }
        else {
            console.log(data)
            toggleAssocNot(data)
        }
    }

    const atualizaNotificacoes = async (itemId: string) => {
        const { data, error } = await supabase
            .from('notificacao')
            .update({ visualizada: true })
            .eq('iddestinatario', userId)
            .eq('artefato', itemId)
            .select()
        if (error) {
            console.log(error)
        }
        else {
            getNotifications(userId)
            checkNotSymbol()
        }
    }

    useEffect(() => {
        checkNotSymbol()
    }, [assocNot])

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
    }, [])

    const aceitarAssociacao = async (event: any, itemId: string) => {
        const { data, error } = await supabase
            .from('associacoes')
            .update({ pendente: false })
            .eq('id', itemId)
        if (error) {
            console.log(error)
        }
        else {
            getNotifications(userId)
            atualizaNotificacoes(itemId)
        }
    }

    const recusarAssociacao = async (event: any, itemId: string) => {
        const { data, error } = await supabase
            .from('associacoes')
            .delete()
            .eq('id', itemId)
        if (error) {
            console.log(error)
        }
        else {
            getNotifications(userId)
            atualizaNotificacoes(itemId)
        }
    }

    const aceitarConexao = async (event: any, itemId: string) => {
        const { data, error } = await supabase
            .from('conexoes')
            .update({ pendente: false })
            .eq('id', itemId)
        if (error) {
            console.log(error)
        }
        else {
            getNotifications(userId)
            atualizaNotificacoes(itemId)
        }
    }

    const recusarConexao = async (event: any, itemId: string) => {
        const { data, error } = await supabase
            .from('conexoes')
            .delete()
            .eq('id', itemId)
        if (error) {
            console.log(error)
        }
        else {
            getNotifications(userId)
            atualizaNotificacoes(itemId)
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
            <div className={`fixed md:absolute top-16 w-screen md:w-auto z-50 left-0 right-0 md:-left-52 md:-right-52 flex items-center justify-center ${notBellClicked ? 'block' : 'hidden'}`}>
                <div className="z-20 w-screen md:w-auto h-[calc(100vh-72px)] md:h-3/6 md:min-w-full md:max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-dark-100 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                        {textos.notifications}
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-auto">
                        {
                            assocNot.length > 0 ?

                                assocNot.map((item: any) => {
                                    if(item.tipo == 'associacao') {
                                        return (
                                            <Notification.Root key={item.id}>
                                                <Notification.Icon icon={HiBell} />
                                                <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.association} date={item.data} />
                                                <Notification.Actions action1={e => aceitarAssociacao(e, item.artefato)} action2={e => recusarAssociacao(e, item.artefato)} texto={textos.notificationlabels} type={'yesno'} />
                                            </Notification.Root>
                                        )
                                    }
                                    else {
                                        if(item.tipo == 'conexao') {
                                            return (
                                                <Notification.Root key={item.id}>
                                                    <Notification.Icon icon={HiBell} />
                                                    <Notification.Content author={item.nomeremetente} authorId={item.idremetente} content={textos.notificationlabels.connection} date={item.data} />
                                                    <Notification.Actions action1={e => aceitarConexao(e, item.artefato)} action2={e => recusarConexao(e, item.artefato)} texto={textos.notificationlabels} type={'yesno'} />
                                                </Notification.Root>
                                            )
                                        }
                                    }
                                    
                                })
                                :
                                <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <div className="w-full text-center justify-center align-center">
                                        <span>{textos.notificationlabels.nonotifications}</span>
                                    </div>
                                </a>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
