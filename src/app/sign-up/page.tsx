import SignUpForm from "@/components/authentication/signup-form";
import Link from "next/link";

export default function SignUpPage() {
	return (
		<main className="flex flex-col justify-center items-center gap-2">
			<SignUpForm />
			<Link href="/">Home</Link>
		</main>
	);
}
