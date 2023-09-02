import SignInButton from '@/components/SignInButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuthSession } from '@/lib/nextauth'
import {redirect} from "next/navigation"

export default async function Home() {
  const session = await getAuthSession()
  console.log(session)
  if(session?.user) {
    return redirect("/dashboard")
  }
  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Welcome to AIgnite Quiz</CardTitle>
          <CardDescription>An AI-powered quiz app that challenges your knowledge and adaptively tailors questions to your expertise, providing an engaging and personalized quiz experience.</CardDescription>
          <CardContent>
            <SignInButton text='Sign in with Google' />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}
