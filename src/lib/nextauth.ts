import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  DefaultSession,
  NextAuthOptions,
  getServerSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connectDB";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
  interface CallbacksOptions {
    cookies: CustomCookies; // This adds the 'cookies' property to CallbacksOptions
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

interface CustomCookies {
  callbackUrl: {
    name: string;
    options: {
      sameSite: string;
      path: string;
      secure: boolean;
    };
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      //   clientId: process.env.GOOGLE_ID!,
      //   clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prisma.user.findFirst({
        where: {
          email: token?.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    cookies: {
      callbackUrl: {
        name: "__Secure-next-auth.callback-url",
        options: {
          sameSite: "lax",
          path: "/",
          secure: false,
        },
      },
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
