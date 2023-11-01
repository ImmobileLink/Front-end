"use client";

import { Dropdown } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";

interface CountryDropdownProps { }

export default function CountryDropdown({ }: CountryDropdownProps) {
    const pathname = usePathname()
    const router = useRouter();
    const checkRoute = (pathname: string) => {
        if (pathname.includes('/pt/')) {
            return <CircleFlag countryCode="br" className="max-h-5 justify-self-end" />
        }
        else {
            return <CircleFlag countryCode="us" className="max-h-5 justify-self-end" />
        }
    }
    const handleRoute = (route: string) => {
        if(route == 'pt') {
            setCurrentLanguage(<CircleFlag countryCode="br" className="max-h-5 justify-self-end" />)
        }
        else {
            setCurrentLanguage(<CircleFlag countryCode="us" className="max-h-5 justify-self-end" />)
        }
        // router.push(`/${route}/${pathname.slice(4)}`)
        setTimeout(() => {
            window.location.replace(`/${route}/${pathname.slice(4)}`);
        }, 100);
    }
    const [currentLanguage, setCurrentLanguage] = useState(checkRoute(pathname))
    return (
        <>
            <Dropdown inline className="ring-none bg-gray-100 dark:bg-gray-600 hover:outline-none" label={currentLanguage}>
                <Dropdown.Item >
                    <div className="flex flex-row gap-1" onClick={e => handleRoute('pt')}>
                        <CircleFlag countryCode="br" className="max-h-5 justify-self-end" />
                        <p>PT-BR</p>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item className="gap-1">
                    <div className="flex flex-row gap-1" onClick={e => handleRoute('en')}>
                        <CircleFlag countryCode="us" className="max-h-5 justify-self-end" />
                        <p>EN-US</p>
                    </div>
                </Dropdown.Item>
            </Dropdown>
        </>
    );
}
