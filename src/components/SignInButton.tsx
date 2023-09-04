"use client"

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

type Props = {
    text: string
    height: number
}

const SignInButton = ({ text, height=10 }: Props) => {
    return (
        <Button className={`h-${height} w-fit`} onClick={() => {
            signIn('google')
        }}>{text}</Button>
    )
}

export default SignInButton