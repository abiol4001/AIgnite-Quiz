import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connectDB";

declare module "next-auth" {
    interface Session extends DefaultSession{
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        token: string
    }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
        const db_user = await prisma.user.findUnique({
            where: {
                email: token?.email,
            },
        });
        if(db_user) {
            token.id = db_user.id
        }
        return token
    },
    session: ({ session,token }) => {
        if(token) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.picture
        }
        return session
    }
  }
}


export const getAuthSession = () => getServerSession(authOptions);