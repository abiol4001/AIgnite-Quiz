import { getAuthSession } from '@/lib/next-auth'
import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'
// import styles from "../app/global.module.css"

type Props = {}

const Navbar = async (props: Props) => {
    const session = await getAuthSession()

    if(session?.user) {
        return <pre>{JSON.stringify(session.user, null, 2)}</pre>
    }
  return (
    <div className='fixed h-[90px] inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] border-b border-x-zinc-300'>
        <div className='flex items-center justify-between jb h-full gap-2 px-8 mx-auto max-w-7xl'>

            {/* Site Logo */}
              <Link href="/" className='hover:-translate-y-[1px] duration-200'>
                <p className={`text-2xl font-thrives `}>AIgnite</p>
            </Link>

            <div className='flex items-center'>
            {session?.user ? (
                <p>Welcome {session?.user.name}</p>
            ): (
            <SignInButton text='Login' />
            )}
            </div>
        </div>
    </div>
  )
}

export default Navbar