import React from 'react'
import { getAuthSession } from '@/lib/nextauth'
import { redirect, useSearchParams } from 'next/navigation'
import CreateQuiz from '@/components/quiz/CreateQuiz'

type Props = {
    searchParams: {
        topic?: string
    }
}

export const metadata = {
    title: "Dashboard | AIgnite"
}

const QuizPage = async ({ searchParams }: Props) => {
    
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect("/")
    }

    return (
        <main className='pt-32 mx-auto max-w-7xl'>
            <CreateQuiz topicParam={searchParams.topic ?? ''} />
        </main>
    )
}

export default QuizPage