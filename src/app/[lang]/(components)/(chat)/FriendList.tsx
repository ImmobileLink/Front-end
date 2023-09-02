'use client'
import { FlowbiteTabTheme, Tabs } from "flowbite-react";
import { userGroup } from "../../../../../lib/modelos";
import FriendListCard from "./FriendListCard";
import { MdGroups } from 'react-icons/md';
import { BsPersonLinesFill } from 'react-icons/bs';

interface FriendListProps {
    dict: any;
    userType: string | undefined;
    userId: string | undefined;
    userLinks: userGroup;
    userAssocs: userGroup;
}

const customTheme: FlowbiteTabTheme = {
    "base": "flex flex-col gap-2",
    "tablist": {
        "base": "flex text-center",
        "styles": {
            "default": "flex-wrap border-b border-gray-200 dark:border-gray-700",
            "underline": "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
            "pills": "flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2",
            "fullWidth": "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none"
        },
        "tabitem": {
            "base": "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:text-gray-700 focus:bg-gray-50 dark:focus:text-white dark:focus:bg-gray-700",
            "styles": {
                "default": {
                    "base": "rounded-t-lg",
                    "active": {
                        "on": "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
                        "off": "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300"
                    }
                },
                "underline": {
                    "base": "rounded-t-lg",
                    "active": {
                        "on": "text-cyan-600 rounded-t-lg border-b-2 border-cyan-600 active dark:text-cyan-500 dark:border-cyan-500",
                        "off": "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    }
                },
                "pills": {
                    "base": "",
                    "active": {
                        "on": "rounded-lg bg-cyan-600 text-white",
                        "off": "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                    }
                },
                "fullWidth": {
                    "base": "ml-0 first:ml-0 w-full rounded-none flex",
                    "active": {
                        "on": "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none",
                        "off": "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none"
                    }
                }
            },
            "icon": "mr-2 h-5 w-5"
        }
    },
    "tabpanel": "py-3"
}

export default function FriendList({ dict, userType, userId, userLinks, userAssocs }: FriendListProps) {
    return (
        <>
            <Tabs.Group
                aria-label="Full width tabs"
                style="fullWidth"
                theme={customTheme}
            >
                <Tabs.Item
                    active
                    icon={MdGroups}
                    title={`${dict.chat.newconvlabel1}`}
                >
                    <div className={`flex flex-col pt-1 max-h-fit overflow-y-auto snap-start gap-1`}>
                        {userAssocs!.length > 0 && userId
                            ? userAssocs!.map((item) => {
                                return (
                                    <FriendListCard
                                        key={item.id}
                                        idremetente={userId}
                                        iddestinatario={item.id}
                                        nome={item.nome}
                                    />
                                );
                            }) : userType == 'corporacao' ?
                                <span className="text-black dark:text-white text-center">{dict.feed.cards.norelatedbrokersyet}</span>
                                :
                                <span className="text-black dark:text-white text-center">{dict.feed.cards.norelatedcompanyyet}</span>
                        }
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    icon={BsPersonLinesFill}
                    title={`${dict.chat.newconvlabel2}`}
                >

                    <div className={`flex flex-col pt-1 max-h-fit overflow-y-auto snap-start  gap-1`}>
                        {userLinks!.length > 0 && userId
                            ? userLinks!.map((item) => {
                                return (
                                    <FriendListCard
                                        key={item.id}
                                        idremetente={userId}
                                        iddestinatario={item.id}
                                        nome={item.nome}
                                    />
                                );
                            }) : <span className="text-black dark:text-white text-center">{dict.feed.cards.nolinksyet}</span>}
                    </div>
                </Tabs.Item>
            </Tabs.Group>
        </>
    );
}