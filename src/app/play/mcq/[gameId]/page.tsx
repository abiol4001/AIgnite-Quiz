import MCQ from '@/components/quiz/MCQ'
import { prisma } from '@/lib/connectDB'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: {
        gameId: string
    }
}

const Mcq = async ({ params: { gameId }}: Props) => {
    const session = await getAuthSession();
    if (!session?.user) {
        return redirect("/");
    }

    const game = await prisma.game.findUnique({
        where: {
            id: gameId,
        },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    options: true,
                },
            },
        },
    });

    
    if (!game || game.gameType === "open_ended") {
        return redirect("/quiz");
    }
    return <MCQ game={game} />;
}

export default Mcq