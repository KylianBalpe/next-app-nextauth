import NameForm from "@/components/profile/name-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/components/session-provider";

export default async function SettingsPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/");
	}

	return (
		<main className="flex items-center justify-center flex-col gap-4 p-12">
			<SessionProvider session={session}>
				<NameForm />
			</SessionProvider>
		</main>
	);
}
