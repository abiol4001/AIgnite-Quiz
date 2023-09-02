"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { BrainCog, BrainIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {}

const StartQuiz = (props: Props) => {
    const router = useRouter()
  return (
    <Card className='hover:cursor-pointer hover:opacity-75' onClick={()=>router.push("/quiz")}>
        <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-2xl font-semibold'>Start Quiz!</CardTitle>
            <BrainIcon size={25} strokeWidth={2.5}/>
        </CardHeader>
        <CardContent>
            <p>Take up the interesting quiz challenge</p>
        </CardContent>
    </Card>
  )
}

export default StartQuiz