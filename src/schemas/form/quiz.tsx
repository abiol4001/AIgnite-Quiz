import {z} from "zod"

export const quizCreationSchema = z.object({
    topic: z.string().min(4, {message: "Topic must be at least 4 characters long"}),
    type: z.enum(['mcq', 'open_ended']),
    amount: z.number().min(5).max(10),
})