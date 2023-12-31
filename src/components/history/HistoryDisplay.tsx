import { prisma } from '@/lib/connectDB'
import { BoxSelect, Clock1, Edit3Icon, ListChecks} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    limit: number,
    userId: string
}

const HistoryDisplay = async ({limit, userId}: Props) => {
    const games = await prisma.game.findMany({
        take: limit,
        where: {
            userId,
        },
        orderBy: {
            timeStarted: "desc"
        }
    })

  return (
    <div className='flex flex-col gap-4'>
          {games.map((game) => {
              return (
                  <div className="flex items-center justify-between" key={game.id}>
                      <div className="flex items-center">
                          {game.gameType === "mcq" ? (
                              <ListChecks className="mr-3" />
                          ) : (
                              <Edit3Icon className="mr-3" />
                          )}
                          <div className="ml-4 space-y-1">
                              <Link
                                  className="text-base font-medium leading-none underline"
                                  href={`/statistics/${game.id}`}
                              >
                                  {game.topic}
                              </Link>
                              <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                                  <Clock1 className="w-4 h-4 mr-1" />
                                  {new Date(game.timeStarted ?? 0).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                  {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
                              </p>
                          </div>
                      </div>
                  </div>
              );
          })}
    </div>
  )
}

export default HistoryDisplay