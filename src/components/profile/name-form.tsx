"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { updateName } from "@/lib/actions/profile";

const formSchema = z.object({
	name: z.string().min(2).max(255),
});

export default function NameForm() {
	const { data: session, status, update } = useSession();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: session?.user.name || "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (status === "authenticated" && session) {
			try {
				const user = await updateName(values.name);
				if (user) {
					form.reset();

					await update({ name: user.name });
				}
			} catch (error) {
				console.error(error);
			}
		}
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Name</CardTitle>
						<CardDescription>Profile name</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="border-t p-6">
						<Button type="submit">Submit</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
