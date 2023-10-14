import HistoryCard from '@/components/dashboard/HistoryCard'
import HotTopics from '@/components/dashboard/HotTopics'
import RecentActivities from '@/components/dashboard/RecentActivities'
import StartQuiz from '@/components/dashboard/StartQuiz'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'


type Props = {}

export const metadata = {
    title: "Dashboard | AIgnite"
}

const Dashboard = async (props: Props) => {
    const session = await getAuthSession()
    if(!session?.user) {
        return redirect('/')
    }
  return (
    <main className='pt-[100px] mx-auto max-w-7xl'>
        <div>
            <h2 className='font-extrabold text-3xl'>Dashboard</h2>
        </div>

        <div className='grid gap-5 mt-4 md:grid-cols-2'>
            <StartQuiz />
            <HistoryCard />
        </div>

        <div className='grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7'>
            <HotTopics />
            <RecentActivities />
        </div>
    </main>
  )
}

export default Dashboard