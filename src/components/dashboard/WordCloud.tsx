"use client"

import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from "react-d3-cloud"

type Props = {}

const data = [
    {
        text: "Hello",
        value: 4
    },
    {
        text: "Programmer",
        value:6
    },
    {
        text: "Client side",
        value:8
    },
    {
        text: "Coder",
        value: 3
    },
    {
        text: "Next",
        value: 5
    },
    {
        text: "cybersecurity",
        value: 9
    },
]

const fontSizeMapper = (word: {value: number}) => {
    return Math.log2(word.value) * 5 + 16
}

const WordCloud = (props: Props) => {
    const theme = useTheme()
    return (
        <div>
            <D3WordCloud data={data} height={550} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} fill={theme.theme === "dark" || theme.theme === "system" ? "white" : "black"} />
        </div>
    )
}

export default WordCloud