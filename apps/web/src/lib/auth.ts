import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@repo/db/client";
import { NextAuthOptions } from "next-auth";
console.log(process.env.NEXTAUTH_SECRET, "SECRET");
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      //   @ts-ignore
      async authorize(credentials: any) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        }

        console.log(credentials, "credentials");

        try {
            const newUser = await prisma.user.create({
              // @ts-ignore
              data: {
                email: credentials.email as string,
                password: bcrypt.hashSync(credentials.password, 10),
              },
            });
    
            return newUser;

        }

        catch (error) {
          console.log(error);
        }

      },
    }),
  ],
  secret: process.env.SECRET as string,
  //   pages:{
  //     signIn:'/login'
  //   }

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, user }) {
       if (user) {
        session.user = user;
        }
      return session;
    },
  },
};

export default authOptions;
