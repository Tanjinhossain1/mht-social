
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

const authOptions:NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: 'email' },
        password: { label: "Password", type: 'password' },
      },

      authorize: async (credentials:any) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) {
          throw new Error('Please provide both email and password')
        }

        const user = await prisma.user.findUnique({ where: { email } });
        // const user = await db.select().from(users).where(eq(users.email, email))
        console.log('asdkjfkajsdkfljdsafj',
          user
        )
        if (!user?.id) {
          throw new Error('Invalid Email')
        }
        const isMatched = await compare(password, user?.password)
        console.log('this inside credintioal ', isMatched, password, user?.password)
        if (password === user?.password) {
          console.log('Password Match')
          const userData = {
            firstName: user.firstName,
            email: user.email,
            id: user.id.toString(),
            role: user.role,
            lastName: user.lastName,
            birthDay: user.birthDay,
            birthMonth: user.birthMonth,
            birthYear: user.birthYear,
            gender: user.gender,
          }
          return userData;
        } else if (!isMatched) {
          throw new Error('Password did not matched')
        }
        const userData = {
          firstName: user.firstName,
          email: user.email,
          id: user.id.toString(),
          role: user.role,
          lastName: user.lastName,
          birthDay: user.birthDay,
          birthMonth: user.birthMonth,
          birthYear: user.birthYear,
          gender: user.gender,
        }
        return userData;
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }:any) {
      console.log('user  token 1: ', token, user)
      if (user) {
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.birthDay = user.birthDay;
        token.birthMonth = user.birthMonth;
        token.birthYear = token?.birthYear;
        token.gender = token?.gender;
        token.role = user.role;
        token.id = user.id; // Optionally include user ID
      }
      return token;
    },
    async session({ session, token }:any) {
      console.log('user  token 2:  ', token, session)
      session.user.email = token?.email as string;
      session.user.firstName = token?.firstName as string;
      session.user.firstName = token?.firstName as string;
      session.user.lastName = token?.lastName as string;
      session.user.birthMonth = token?.birthMonth as string;
      session.user.birthYear = token?.birthYear as string;
      session.user.gender = token?.gender as string;
      session.user.lastName = token?.lastName as string;
      session.user.role = token?.role as string;
      session.user.id = token?.id as string; // Optionally include user ID
      return session;
    },
  },

  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
