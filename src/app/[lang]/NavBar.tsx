"use client"
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';

interface ClientComponentProps { }


export default function NavBar({ }: ClientComponentProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    return (

        <nav className="bg-gray-600">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Image
                                className='w-10 h-10'
                                src="assets/favicon/favicon-32x32.png"
                                alt='logo'
                                width={10}
                                height={10}
                            />
                        </div>
                        <div className=' max-[380px]:hidden flex items-center ml-5 w-72 '>
                            <input type="text" className='bg-gray-300 rounded-md w-full outline-none px-2 py-1 text-gray-700' />
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4">
                            <Link
                                href="/feed"
                                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                            >
                                <Image
                                    className="mx-auto h-6 w-auto"
                                    src="assets/icons/home.svg"
                                    alt="Ícone"
                                    width={1}
                                    height={1}
                                />
                            </Link>
                            <Link
                                href="#"
                                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                            >
                                <Image
                                    className="mx-auto h-6 w-auto"
                                    src="assets/icons/notificacao.svg"
                                    alt="Ícone"
                                    width={1}
                                    height={1}
                                />
                            </Link>
                            <Link
                                href="#"
                                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                            >
                                <Image
                                    className="mx-auto h-6 w-auto"
                                    src="assets/icons/chat.svg"
                                    alt="Ícone"
                                    width={1}
                                    height={1}
                                />

                            </Link>
                            <Link
                                href="#"
                                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
                            >
                                <Image
                                    className="mx-auto h-6 w-auto"
                                    src="assets/icons/perfil.svg"
                                    alt="Ícone"
                                    width={1}
                                    height={1}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="flex -mr-2 md:hidden">
                        <button
                            type="button"
                            onClick={toggleNavbar}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                            aria-label="Menu"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 sm:px-3">
                        <Link
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                        >
                            Feed
                        </Link>
                        <Link
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                        >
                            Notificações
                        </Link>
                        <Link
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                        >
                            Mensagens
                        </Link>
                        <Link
                            href="#"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                        >
                            Perfil
                        </Link>
                    </div>
                </div>
            )}
        </nav>

    );
};

