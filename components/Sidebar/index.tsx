"use client"
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    Workflow,
    Settings,
    BookOpen,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from '../ui/avatar';
import Image from 'next/image';
import LogoutButton from '@/components/LogoutButton';

interface SidebarItem {
    text: string;
    value: string;
    icon: React.ReactNode;
}

function getSideBarText(isCollapsed: boolean, text: string) {
    return isCollapsed ? null : <span
        className={`
    transition-all duration-300 ease-in-out 
    ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
  `}
    >
        {text}
    </span>;
}

function getSideBarItem(item: SidebarItem, isCollapsed: boolean) {
    if (isCollapsed) {
        return (
            <Tooltip key={item.value}>
                <TooltipTrigger asChild>
                    <Link
                        href={item.value}
                        className="flex items-center justify-center duration-300 ease-in-out hover:bg-primary-surface hover:text-primary p-3 rounded-lg text-sm font-medium w-full"
                    >
                        {item.icon}
                    </Link>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="bg-gray-800 text-white text-sm p-2"
                >
                    {item.text}
                </TooltipContent>
            </Tooltip>
        );
    }
    return (
        <Link
            key={item.value}
            href={item.value}
            className="flex items-center duration-300 ease-in-out gap-3 hover:bg-primary-surface hover:text-primary p-3 rounded-lg text-sm font-medium"
        >
            {item.icon}
            {getSideBarText(isCollapsed, item.text)}
        </Link>
    );
}

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarItems: SidebarItem[] = [
        { text: "Dashboard", value: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { text: "Documents", value: "/documents", icon: <FileText size={20} /> },
        // { text: "Clients", value: "/clients", icon: <Users size={20} /> },
        { text: "AI Flow", value: "/ai-flows", icon: <Workflow size={20} /> },
        { text: "Knowledge and Rule", value: "/settings/document-types", icon: <BookOpen size={20} /> },
        { text: "Settings", value: "/settings", icon: <Settings size={20} /> }
    ];

    const username = "User";
    const avatarFallback = username.slice(0, 2).toUpperCase();

    return (
        <div
            className={`bg-white border-r border-gray-200 p-4 pb-6 flex flex-col gap-4 duration-300 ease-in-out overflow-hidden shadow-sm
            ${isCollapsed ? 'w-20' : 'w-64'}
            `}
        >
            {/* Top: Logo */}
            <div className='p-2 flex justify-between items-center'>
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="KontrakWise"
                            width={32}
                            height={32}
                            className="rounded"
                        />
                        <span className='text-lg font-semibold text-gray-900'>KontrakWise</span>
                    </div>
                )}

                {
                    isCollapsed ?
                        <PanelLeftOpen
                            size={20}
                            onClick={() => setIsCollapsed(false)}
                            className='cursor-pointer text-gray-600 hover:text-primary'
                        />
                        :
                        <PanelLeftClose
                            size={20}
                            onClick={() => setIsCollapsed(true)}
                            className='cursor-pointer text-gray-600 hover:text-primary'
                        />
                }
            </div>

            {/* Middle: Navigation */}
            <div className='flex-1 flex flex-col gap-2'>
                {sidebarItems.map((item: SidebarItem) =>
                    getSideBarItem(item, isCollapsed)
                )}
            </div>

            {/* Bottom: User settings and Knowledge Base status */}
            <div className='py-4 px-2 border-t border-gray-200'>
                {!isCollapsed && (
                    <div className="mb-3 p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800">
                            <BookOpen size={16} />
                            <span className="text-xs font-medium">Knowledge Base</span>
                        </div>
                        <span className="text-xs text-green-600 ml-6">Active</span>
                    </div>
                )}

                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='w-10 h-10'>
                            <AvatarFallback className='bg-gray-100 text-gray-600 border border-gray-300'>
                                {avatarFallback}
                            </AvatarFallback>
                        </Avatar>
                        {!isCollapsed && (
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium text-gray-900'>{username}</span>
                                <span className='text-xs text-gray-500'>user@example.com</span>
                            </div>
                        )}
                    </div>
                    <div className='flex items-end'>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <LogoutButton />
                            </TooltipTrigger>
                            <TooltipContent className='bg-primary [&_svg]:bg-primary [&_svg]:fill-primary text-white'>
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
