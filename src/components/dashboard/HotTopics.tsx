import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import WordCloud from './WordCloud'

type Props = {}

const HotTopics = (props: Props) => {
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
              <WordCloud />
          </CardContent>
      </Card>
  )
}

export default HotTopics