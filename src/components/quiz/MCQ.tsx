"use client"

import { Game, Question } from '@prisma/client'
import { ChevronRight, Loader2, Timer } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import MCQCounter from './MCQCounter';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { checkAnswerSchema } from '@/schemas/questions';
import { string, z } from 'zod';

type Props = {
    game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
}

const MCQ = ({ game }: Props) => {

    const [questionIndex, setQuestionIndex] = useState(0)
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    const [stats, setStats] = useState({
        correct_answers: 0,
        wrong_answers: 0,
    })
    const [now, setNow] = useState(new Date());
    const [gameEnded, setGameEnded] = useState(false)

    const currentQuestion = useMemo(()=> {
        return game.questions[questionIndex]
    }, [questionIndex, game.questions])

    const options = useMemo(()=> {
        if(!currentQuestion) return []
        if(!currentQuestion.options) return []
        return JSON.parse(currentQuestion.options as string) as string[]
    }, [currentQuestion])


    const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
        mutationFn: async () => {
            const payload: z.infer<typeof checkAnswerSchema> = {
                questionId: currentQuestion.id,
                userInput: selectedChoice !== null ? options[selectedChoice] : "",

            };
            const response = await axios.post(`/api/checkAnswer`, payload);
            setSelectedChoice(null)
            return response.data;
        },
    });

    const handleNext = useCallback(() => {
        checkAnswer(undefined, {
            onSuccess: ({ isCorrect }) => {
                if (isCorrect) {
                    setStats((stats) => ({
                        ...stats, correct_answers: stats.correct_answers + 1,
                    }))
                } else {
                    setStats((stats) => ({...stats, wrong_answers: stats.wrong_answers + 1}))
                }

                if (questionIndex === game.questions.length - 1) {
                    setGameEnded(true);
                    return;
                }

                setQuestionIndex((questionIndex) => questionIndex + 1);
                setSelectedChoice(null)
            }
        })
    }, [checkAnswer, questionIndex, game.questions.length])
  
    
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    {/* topic */}
                    <p>
                        <span className="text-slate-400">Topic</span> &nbsp;
                        <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
                            {game.topic}
                        </span>
                    </p>
                    <div className="flex self-start mt-3 text-slate-400">
                        <Timer className="mr-2" />
                        {/* {formatTimeDelta(differenceInSeconds(now, game.timeStarted))} */}
                    </div>
                </div>
                <MCQCounter
                    correct_answers={stats.correct_answers}
                    wrong_answers={stats.wrong_answers}
                />
            </div>
            <Card className="w-full mt-4">
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
                        <div>{questionIndex + 1}</div>
                        <div className="text-base text-slate-400">
                            {game.questions.length}
                        </div>
                    </CardTitle>
                    <CardDescription className="flex-grow text-lg">
                        {currentQuestion?.question}
                    </CardDescription>
                </CardHeader>
            </Card>
            <div className="flex flex-col items-center justify-center w-full mt-4">
                {options.map((option, index) => (
                        <Button
                            key={option}
                            variant={selectedChoice === index ? "default" : "outline"}
                            className="justify-start w-full py-8 mb-4"
                            onClick={() => setSelectedChoice(index)}
                        >
                            <div className="flex items-center justify-start">
                                <div className="p-2 px-3 mr-5 border rounded-md">
                                    {index + 1}
                                </div>
                                <div className="text-start">{option}</div>
                            </div>
                        </Button>
                    )
                )}
                <Button
                    variant="default"
                    className="mt-2"
                    size="lg"
                    disabled={isChecking}
                    onClick={() => {
                        handleNext();
                    }}
                >
                    {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

export default MCQ