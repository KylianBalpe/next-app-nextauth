"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema } from "@/lib/form/user-form";
import { useRouter } from "next/navigation";

export default function SignInForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
		try {
			const res = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			if (res?.error) {
				toast(res.error);
				return;
			}

			toast("Logged in successfully");
			router.push("/");
		} catch (error) {
			console.error(error);
			toast("An error occurred. Please try again.");
		}
	}

	return (
		<Card className="mx-auto max-w-xl w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full" type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="border-t p-6">
				<Button className="w-full" onClick={() => signIn("github")}>
					Sign In with GitHub
				</Button>
			</CardFooter>
		</Card>
	);
}
