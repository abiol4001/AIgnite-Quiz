import { prisma } from "@/lib/connectDB";
import { endGameSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = req.json();
    const { gameId } = endGameSchema.parse(body);

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return NextResponse.json(
        {
          message: "Quiz not found",
        },
        { status: 404 }
      );
    }

    await prisma.game.update({
        where: {
            id: gameId
        },
        data: {
            timeEnded: new Date()
        }
    })

    return NextResponse.json({message: "Quiz ended"})
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
