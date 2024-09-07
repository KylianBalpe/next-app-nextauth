import SignInForm from "@/components/authentication/signin-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/");
	}

	return (
		<main className="flex flex-col justify-center items-center gap-2">
			<SignInForm />
			<Link href="/">Home</Link>
		</main>
	);
}
