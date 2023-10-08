
"use client";
import { useState } from "react";
import { HiBell } from "react-icons/hi2";

interface NotificationDropdownProps { }

export default function NotificationDropdown({ }: NotificationDropdownProps) {
    const [notBellClicked, setNotBellClicked] = useState<boolean>(false)

    return (
        <div>
            <button onClick={e => {setNotBellClicked(!notBellClicked)}} className={`p-0 w-auto rounded  border-0 ${notBellClicked ? 'text-blue-700 dark:text-blue-700' : 'text-gray-900 hover:bg-gray-100 hover:bg-transparent hover:text-blue-700 dark:text-white dark:hover:bg-transparent'}`}>
                <HiBell size={32} />
            </button>
            <div className={`fixed w-screen md:w-auto z-50 top-16 right-0 md:right-20 lg:right-20 xl:right-40 left-0 md:left-auto flex items-center justify-center ${notBellClicked ? 'block' : 'hidden'}`}>
                <div className="z-20 w-screen md:w-auto h-[calc(100vh-72px)] md:max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-dark-100 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                        Notifications
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="flex-shrink-0">
                                oi
                            </div>
                            <div className="w-full pl-3">
                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</div>
                            </div>
                        </a>
                        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="flex-shrink-0">
                                oi
                            </div>
                            <div className="w-full pl-3">
                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span> and <span className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</div>
                            </div>
                        </a>
                        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="flex-shrink-0">
                                oi
                            </div>
                            <div className="w-full pl-3">
                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span> and <span className="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">44 minutes ago</div>
                            </div>
                        </a>
                        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="flex-shrink-0">
                                oi
                            </div>
                            <div className="w-full pl-3">
                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Leslie Livingston</span> mentioned you in a comment: <span className="font-medium text-blue-500">@bonnie.green</span> what do you say?</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">1 hour ago</div>
                            </div>
                        </a>
                        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <div className="flex-shrink-0">
                                oi
                            </div>
                            <div className="w-full pl-3">
                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend.</div>
                                <div className="text-xs text-blue-600 dark:text-blue-500">3 hours ago</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
