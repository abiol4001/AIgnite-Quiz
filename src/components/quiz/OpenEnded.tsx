"use client"

import { checkAnswerSchema, endGameSchema } from '@/schemas/questions';
import { Game, Question } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react'
import { z } from 'zod';
import { Button, buttonVariants } from '../ui/button';
import { cn, formatTimeDelta } from '@/lib/utils';
import { BarChart, ChevronRight, Loader2, Timer } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { differenceInSeconds } from "date-fns"
import OpenEndedPercentage from './OpenEndedPercentage';
import BlankAnswerInput from './BlankAnswerInput';
import { toast } from '../ui/use-toast';

type Props = {
    game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
}

const OpenEnded = ({game}: Props) => {
    const [hasEnded, setHasEnded] = React.useState(false);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [blankAnswer, setBlankAnswer] = React.useState("");
    const [averagePercentage, setAveragePercentage] = React.useState(0);
    const currentQuestion = React.useMemo(() => {
        return game.questions[questionIndex];
    }, [questionIndex, game.questions]);

    const [now, setNow] = React.useState(new Date());
    
    const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
        mutationFn: async () => {
            let filledAnswer = blankAnswer;
            document.querySelectorAll<HTMLInputElement>("#user-blank-input").forEach((input) => {
                filledAnswer = filledAnswer.replace("_____", input.value);
                setTimeout(() => {
                    input.value = "";
                }, 2700);
            });
            const payload: z.infer<typeof checkAnswerSchema> = {
                questionId: currentQuestion.id,
                userInput: filledAnswer,
            };
            const response = await axios.post(`/api/checkAnswer`, payload);
            return response.data;
        },
    });

    useEffect(() => {
        if (!hasEnded) {
            const interval = setInterval(() => {
                setNow(new Date());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [hasEnded]);

    const { mutate: endGame } = useMutation({
        mutationFn: async () => {
            const payload: z.infer<typeof endGameSchema> = {
                gameId: game.id,
            };
            const response = await axios.post(`/api/endGame`, payload);
            return response.data;
        },
    });

    const handleNext = useCallback(() => {
        checkAnswer(undefined, {
            onSuccess: ( {percentageSimilar} ) => {
                toast({
                    title: `Your answer is ${percentageSimilar}% similar to the correct answer`
                });
                setAveragePercentage((prev) => {
                    return Math.round((prev + percentageSimilar) / (questionIndex + 1))
                })
                if (questionIndex === game.questions.length - 1) {
                    endGame();
                    setHasEnded(true);
                    return;
                }
                setQuestionIndex((prev) => prev + 1);
            },
            onError: (error) => {
                console.log(error)
                toast({
                    title: "Something went wrong",
                    variant: "destructive"
                })
            }
        })
    }, [checkAnswer, questionIndex, game.questions.length, endGame])

    useEffect(()=> {
        const handleKeydown = (event: KeyboardEvent) => {
            const key = event.key
            if(key === 'Enter') {
                handleNext()
            }
            document.addEventListener("keydown", handleKeydown)

            return () => {
                document.removeEventListener("keydown", handleKeydown)
            }
        }
    }, [handleNext])


    if (hasEnded) {
        return (
            <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
                    You Completed in{" "}
                    {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
                </div>
                <Link
                    href={`/statistics/${game.id}`}
                    className={cn(buttonVariants({ size: "lg" }), "mt-2")}
                >
                    View Statistics
                    <BarChart className="w-4 h-4 ml-2" />
                </Link>
            </div>
        );
    }

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
                      {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
                  </div>
              </div>
              <OpenEndedPercentage percentage={averagePercentage} />
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
              <BlankAnswerInput
                  setBlankAnswer={setBlankAnswer}
                  answer={currentQuestion.answer}
              />
              <Button
                  variant="outline"
                  className="mt-4"
                  disabled={isChecking || hasEnded}
                  onClick={() => {
                      handleNext();
                  }}
              >
                  {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
          </div>
      </div>
  )
}

export default OpenEnded