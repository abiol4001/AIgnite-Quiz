import { strict_output } from "@/lib/gpt";
import { quizCreationSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request, res: Response) => {
    try {
        const body = await req.json()
        const { amount, topic, type } = quizCreationSchema.parse(body)
        let questions: any;

        if (type === 'open_ended') {
            questions = await strict_output(
                'You are a helpful AI that is able to generate a pair of questions and answers, the length of amswer should not exceed 15 words, store all the pairs of questions and answers in a JSON array',
                `You are to generate a random hard open-ended question about ${topic} `,
                {
                    question: "question",
                    answer: "answer with max length of 15 words",
                }
            )
        }
        else if(type === 'mcq') {

        }

        if (!questions) {
            return new NextResponse(
              JSON.stringify({ message: "Something went wrong!" }),
              { status: 500 }
            );
        }
        return NextResponse.json({questions}, {status: 200})
    } catch (error) {
        if(error instanceof ZodError) {
            return NextResponse.json({
                error: error.issues
            }, {
                status: 400
            })
        }
        return new NextResponse(
          JSON.stringify({ message: "Unable to try block!" }),
          { status: 500 }
        );
    }
}