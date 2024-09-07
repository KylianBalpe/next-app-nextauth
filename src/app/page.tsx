import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<main className="flex flex-col items-center gap-4 p-24 min-h-screen justify-center">
			{!session && (
				<div className="flex flex-row gap-4">
					<Button asChild>
						<Link href="/sign-in">Sign In</Link>
					</Button>
					<Button asChild>
						<Link href="/sign-up">Sign Up</Link>
					</Button>
				</div>
			)}
			<ThemeToggle />
		</main>
	);
}
