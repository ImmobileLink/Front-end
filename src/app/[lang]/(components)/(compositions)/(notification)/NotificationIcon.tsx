"use client";

import { ElementType } from "react";

interface NotificationIconProps { 
    icon: ElementType
}

export default function NotificationIcon({ icon: Icon}: NotificationIconProps) {
    return (
        <Icon size={40}/>
    );
}
