"use client"

import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import D3WordCloud from "react-d3-cloud"

type Props = {
    data: {
        text: string,
        value: number
    }[]
}


const fontSizeMapper = (word: { value: number }) => {
    return Math.log2(word.value) * 5 + 16
}

const WordCloud = ({ data }: Props) => {
    const router = useRouter()

    const theme = useTheme()
    return (
        <div>
            <D3WordCloud data={data}
                onWordClick={(event, word) => {
                    router.push(`/quiz?topic=${word.text}`)
                }} onWordMouseOver={(event, word) => {
                    // Get the element that was moused over
                    const wordElement = event.target;

                    // Add a CSS class to underline the text (you can define this class in your CSS)
                    wordElement.classList.add('underline-text');
                }}
                onWordMouseOut={(event, word) => {
                    // Get the element that was moused over
                    const wordElement = event.target;

                    // Remove the CSS class to underline the text (you can define this class in your CSS)
                    wordElement.classList.remove('underline-text');
                }} height={550} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} fill={theme.theme === "dark" || theme.theme === "system" ? "white" : "black"} />
        </div>
    )
}

export default WordCloud