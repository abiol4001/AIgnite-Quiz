"use client"

import { quizCreationSchema } from '@/schemas/form/quiz'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Book, BookOpen, CopyCheck, LucideSeparatorVertical, OptionIcon, SeparatorVertical, SeparatorVerticalIcon } from 'lucide-react'


const CreateQuiz = () => {

    type Input = z.infer<typeof quizCreationSchema>

    const form = useForm<Input>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 10,
            topic: "",
            type: "open_ended"
        }
    })

    const onSubmit = (input: Input) => {
        alert(JSON.stringify(input, null, 2))
    }

    form.watch()

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
                                          <Input placeholder="Enter a topic" {...field} type='number' onChange={(e)=> form.setValue('amount', parseInt(e.target.value))} />
                                      </FormControl>
                                      {/* <FormDescription>
                                          Please provide the total number of questions.
                                      </FormDescription> */}
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                          <div className='flex items-center'>
                              <Button type='button' className='rounded-none rounded-l-lg h-14' onClick={()=>form.setValue('type', 'mcq')} variant={form.getValues('type') === 'mcq' ? "default" : "secondary"}> <CopyCheck className='mr-1' /> Mutliple Choice</Button>
                              {/* <LucideSeparatorVertical orientation={"vertical"} /> */}
                              <Button type='button' className='rounded-none rounded-r-lg h-14' onClick={() => form.setValue('type', 'open_ended')} variant={form.getValues('type') === 'open_ended' ? "default" : "secondary"}> <BookOpen className='mr-1' /> Open Ended</Button>
                          </div>
                          <Button type="submit">Submit</Button>
                      </form>
                  </Form>
              </CardContent>
          </Card>
      </div>
  )
}

export default CreateQuiz