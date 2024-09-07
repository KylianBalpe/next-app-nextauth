import type { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import { SignInRequest } from "./model/user-model";
import { signIn } from "./actions/user-action";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: DefaultSession["user"] & User;
	}

	interface User {
		id: string;
	}
}

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			type: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await signIn(credentials as SignInRequest);

				if (user) {
					return {
						id: user.id.toString(),
						email: user.email,
						name: user.name,
						image: user.image,
					};
				} else {
					throw new Error("Invalid credentials");
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},
		async session({ session, token }) {
			const { id } = token as { id: string };
			session = {
				...session,
				user: {
					...session.user,
					id: id,
				},
			};

			return session;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
} satisfies NextAuthOptions;
