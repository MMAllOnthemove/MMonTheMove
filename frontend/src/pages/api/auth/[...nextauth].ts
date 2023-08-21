import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {

    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        })
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET_KEY,
    callbacks: {
        async signIn({ account, profile }: string | any) {
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@allelectronics.co.za")
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    },

}

export default NextAuth(authOptions)