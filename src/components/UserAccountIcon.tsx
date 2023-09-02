"use client"


import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { LogOutIcon } from 'lucide-react';
import { User } from 'next-auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import UserAvatar from './UserAvatar';

type Props = {
    user: Pick<User, "name" | "email" | "image">;
}

const UserAccountIcon = ({ user }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <UserAvatar user={user} /> */}
                <div><UserAvatar user={user} /></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white' align='end'>
                <div className='flex justify-start items-center p-2 gap-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {user.name && <p className='font-medium'>{user.name}</p>}
                        {user.email && <p className='w-[200px] truncate text-sm'>{user.email}</p>}
                    </div>
                </div>
                {/* <p className='font-medium'>Welcome, <span className='font-light'>{user.name}</span></p> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href='/profile'>Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={(e) => {
                    e.preventDefault()
                    signOut().catch(console.error)
                }} className='text-red-500 cursor-pointer flex gap-2'>
                    Sign out <LogOutIcon />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserAccountIcon