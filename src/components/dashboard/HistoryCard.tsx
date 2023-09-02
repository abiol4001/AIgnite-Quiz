"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { History } from 'lucide-react'
import { useRouter } from 'next/navigation'


type Props = {}

const HistoryCard = (props: Props) => {
    const router = useRouter()
  return (
      <Card className='hover:cursor-pointer hover:opacity-75' onClick={() => router.push("/history")}>
          <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle className='text-2xl font-semibold'>History</CardTitle>
              <History size={25} strokeWidth={2.5} />
          </CardHeader>
          <CardContent>
              <p>View all the attempted quiz</p>
          </CardContent>
      </Card>
  )
}

export default HistoryCard