"use client"

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

type Props = {
    text: string
}

const SignInButton = ({ text }: Props) => {
    return (
        <Button className='h-10 w-20 text-lg' onClick={() => {
            signIn('google')
        }}>{text}</Button>
    )
}

export default SignInButton