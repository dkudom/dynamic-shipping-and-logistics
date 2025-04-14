import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

// In a real application, you would validate credentials against a database
// Here we're just mocking it for demo purposes
const mockUsers = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123"
  },
  {
    id: "2",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123"
  }
]

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google-client-secret"
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // In a real app, check this against your database
        const user = mockUsers.find(user => user.email === credentials.email)

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 