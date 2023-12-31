"use client"

import { quizCreationSchema } from '@/schemas/form/quiz'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { BookOpen, CopyCheck, Loader2, } from 'lucide-react'
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import LoadingQuestions from '../LoadingQuestions'
import { toast } from '../ui/use-toast'

type Input = z.infer<typeof quizCreationSchema>

type Props = {
    topicParam: string
}

const CreateQuiz = ({topicParam}: Props) => {

    const [showLoader, setShowLoader] = useState(false)
    const [finished, setFinished] = useState(false)

    const router = useRouter()

    const {mutate: getQuestions, isLoading } = useMutation({
        mutationFn:async ({amount, topic, type}:Input) => {
            const response = await axios.post(`/api/game`, {
                amount, topic, type
            })
            return response.data
        }
    })

    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 10,
            topic: topicParam,
            type: "mcq"
        }
    })

    const onSubmit = async (input: Input) => {
        console.log(process.env.NEXT_PUBLIC_API_URL)
        setShowLoader(true)
        getQuestions({
            amount: input.amount,
            type: input.type,
            topic: input.topic,
        }, {
            onSuccess: ({gameId}) => {
                setFinished(true)
                setTimeout(() => {
                    if (form.getValues('type') === 'open_ended') {
                        router.push(`/play/open-ended/${gameId}`)
                    } else {
                        router.push(`/play/mcq/${gameId}`)
                    }
                }, 2000);
            },
            onError: (error) => {
                setShowLoader(false)
                if (error instanceof AxiosError) {
                    if (error.response?.status === 500) {
                        toast({
                            title: "Error",
                            description: "Something went wrong. Please try again later.",
                            variant: "destructive",
                        });
                    }
                }
            }
        })
    }

    form.watch()

    if(showLoader) {
        return <LoadingQuestions finished={finished} />
    }

    return (
        <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl font-semibold'>Quiz Creation</CardTitle>
                    <CardDescription>Choose a topic</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Topic</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a topic" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Please provide a topic.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Questions</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a topic" {...field} type='number' onChange={(e) => form.setValue('amount', parseInt(e.target.value))} />
                                        </FormControl>
                                        {/* <FormDescription>
                                          Please provide the total number of questions.
                                      </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex items-center'>
                                <Button type='button' className='rounded-none rounded-l-lg h-14' onClick={() => form.setValue('type', 'mcq')} variant={form.getValues('type') === 'mcq' ? "default" : "secondary"}> <CopyCheck className='mr-1' /> Mutliple Choice</Button>
                                {/* <LucideSeparatorVertical orientation={"vertical"} /> */}
                                <Button type='button' className='rounded-none rounded-r-lg h-14' onClick={() => form.setValue('type', 'open_ended')} variant={form.getValues('type') === 'open_ended' ? "default" : "secondary"}> <BookOpen className='mr-1' /> Open Ended</Button>
                            </div>
                            <Button disabled={isLoading} className='h-14' type="submit">{isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateQuiz