import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          if (user.password === credentials?.password) {
            
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
      
    }),
  ],

  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60 * 60 * 60,
  },

  callbacks: {
    async session({ session, token, user }:any) {
      // Send properties to the client, like an access_token and user id from a provider.

      const currentUser = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        }
      })

      session.accessToken = token.accessToken
      session.user.id = currentUser!.id
      // session.user.condominiums = currentUser?.condominiums
      

      console.log(session)
      
      return session
    }
  }
  

  // The secret should be set to a reasonably long random string.
};
export default NextAuth(authOptions);
