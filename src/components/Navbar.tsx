import { getAuthSession } from '@/lib/nextauth'
import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'
import UserAccountIcon from './UserAccountIcon'
import { ThemeToggle } from './ThemeToggle'

type Props = {}

const Navbar = async (props: Props) => {
    const session = await getAuthSession()

    // if(session?.user) {
    //     return <pre>{JSON.stringify(session.user, null, 2)}</pre>
    // }
    return (
        <div className='fixed h-fit py-6 inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] border-b border-x-zinc-300'>
            <div className='flex items-center justify-between jb h-full gap-2 px-8 lg:px-0 mx-auto max-w-7xl'>

                {/* Site Logo */}
                <Link href="/" className='hover:-translate-y-[1px] duration-200'>
                    <p className={`text-2xl font-thrives`}>AIgnite</p>
                </Link>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <div className='flex items-center'>
                        {session?.user ? (
                            <UserAccountIcon user={session.user} />
                        ) : (
                            <SignInButton text='Login' height={10} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar