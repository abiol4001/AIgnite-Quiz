import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import WordCloud from './WordCloud'
import { prisma } from '@/lib/connectDB'

type Props = {}

const HotTopics = async (props: Props) => {

  const topics = await prisma.topic_count.findMany({})
  const refinedTopics = topics.map(topic => {
    return {
      text: topic.topic,
      value: topic.count
    }
  })
  return (
      <Card className='col-span-4'>
          <CardHeader className=''>
              <CardTitle className='text-2xl font-semibold'>Hot Topics!</CardTitle>
              <CardDescription>
                <p>Click on a topic to start a Quiz</p>
              </CardDescription>
              {/* <BrainIcon size={25} strokeWidth={2.5} /> */}
          </CardHeader>
          <CardContent>
              <WordCloud data={refinedTopics} />
          </CardContent>
      </Card>
  )
}

export default HotTopics