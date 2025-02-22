import { getUserByEmail, registerUser } from "@/services/backend";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOption: any = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: { account: any; profile: any }) {
      if (!profile?.email) {
        throw new Error("No Profile");
      }
      const userData: any = {
        firstname: profile.given_name,
        lastname: profile.family_name,
        role: "renter",
        email: profile.email,
        photo_url: profile?.picture || null,
      };
      const result = await registerUser(userData);
      return true;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      if (session.user?.email) {
        const result = await getUserByEmail(session.user?.email);

        session.user = { ...session.user, ...result };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
