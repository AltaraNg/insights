import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
    debug: true,
    providers: [
        CredentialsProvider({
            name: "credentials",
            // eslint-disable-next-line no-unused-vars
            async authorize(credentials, req) {
                const res = await fetch(process.env.AUTH_API, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });
                const user = await res.json();

                if (res.ok && user) {
                    return {
                        id: user.user_id,
                        name: user.user_name,
                        role: user.role,
                    };
                }
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 3 * 60 * 60, // 3 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

export default NextAuth(authOptions);
