import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/connectDB'
import HistoryCard from './HistoryCard'
import HistoryDisplay from '../history/HistoryDisplay'


type Props = {}

const RecentActivities = async (props: Props) => {

    const session = await getAuthSession()

    if(!session?.user) {
        return redirect("/")
    }

    const gamesCount = await prisma.game.count({
        where: {
            userId: session.user.id
        }
    })
  return (
      <Card className='col-span-4 lg:col-span-3'>
          <CardHeader className=''>
              <CardTitle className='text-2xl font-semibold'>Recent Activities</CardTitle>
              <CardDescription>
                  <p>You have played a total of {gamesCount} games</p>
              </CardDescription>
              {/* <BrainIcon size={25} strokeWidth={2.5} /> */}
          </CardHeader>
          <CardContent className='max-h-[500px] overflow-scroll'>
             <HistoryDisplay limit={10} userId={session.user.id} />
          </CardContent>
      </Card>
  )
}

export default RecentActivities