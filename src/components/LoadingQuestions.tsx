"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Progress } from './ui/progress'
import { finished } from 'stream'

type Props = {
    finished: boolean
}

const loadingTexts = [
    "Navigating the labyrinth of curiosity...",
    "Conjuring riddles from the well of imagination...",
    "Brewing a potion of wisdom and wonder...",
    "Assembling the puzzle of knowledge...",
    "Preparing your journey through the data wilderness...",
    "Crafting the perfect experience just for you...",
    "Venturing into the realm of infinite questions...",
    "Forging a path through the jungle of questions...",
    "Delving into the treasure trove of insights...",
    "Building bridges to new horizons...",
]

const LoadingQuestions = ({finished}: Props) => {
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState(loadingTexts[0])

    useEffect(()=> {
        const interval = setInterval(()=> {
            const randomIndex = Math.floor(Math.random() * loadingTexts.length)
            setLoadingText(loadingTexts[randomIndex])
        },3000)
        return ()=> clearInterval(interval)
    },[])

    useEffect(()=> {
        const interval = setInterval(()=> {
            setProgress(prev => {
                if(finished) return prev = 100
                if(prev >= 100) return prev = 0
                if(Math.random() < 0.1) return prev + 1

                return prev + 0.2
            })
        },100)
        return ()=> clearInterval(interval)
    })
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] flex flex-col items-center md:w-[60vw]'>
          <Image src="/creating-questions.gif" width={500} height={500} alt='loading animation' />
          <Progress value={progress} className='w-full mt-4' />
          <h1 className='text-lg md:text-xl mt-2'>{loadingText}</h1>
    </div>
  )
}

export default LoadingQuestions