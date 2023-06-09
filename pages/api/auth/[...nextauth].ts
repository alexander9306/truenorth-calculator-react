import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      // Persist the OAuth access_token to the token right after signin
      if (user?.access_token) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;
      return session; // The return type will match the one returned in `useSession()`
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const { username, password } = credentials;

        const url =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

        const res = await fetch(`${url}/v1/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
        }

        const { user, access_token } = await res.json();

        return {
          id: user.id,
          email: user.username,
          access_token,
        };
      },
    }),
  ],
  pages: {
    signIn: '/authentication/login',
    signOut: '/authentication/login',
    error: '/404',
  },
});
