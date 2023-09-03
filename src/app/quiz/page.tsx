import React from 'react'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { quizCreationSchema } from "@/schemas/form/quiz"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import CreateQuiz from '@/components/quiz/CreateQuiz'

type Props = {}

export const metadata = {
    title: "Dashboard | AIgnite"
}

const QuizPage = async (props: Props) => {
    
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect("/")
    }

    return (
        <main className='pt-32 mx-auto max-w-7xl'>
            <CreateQuiz />
        </main>
    )
}

export default QuizPage