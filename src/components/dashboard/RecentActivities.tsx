import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'


type Props = {}

const RecentActivities = (props: Props) => {
  return (
      <Card className='col-span-4 lg:col-span-3'>
          <CardHeader className=''>
              <CardTitle className='text-2xl font-semibold'>Recent Activities</CardTitle>
              <CardDescription>
                  <p>You have played a total of 100 games</p>
              </CardDescription>
              {/* <BrainIcon size={25} strokeWidth={2.5} /> */}
          </CardHeader>
          <CardContent className='max-h-[500px] overflow-scroll'>
             Histories
          </CardContent>
      </Card>
  )
}

export default RecentActivities