"use client";

import { CircleUser, Triangle } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const Header = () => {
	const { data: session } = useSession();

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-12 flex-row justify-between">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Button size="icon" variant="outline" asChild>
					<Link href="/">
						<Triangle className="size-5 fill-foreground" />
					</Link>
				</Button>
			</nav>
			{session && (
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="ml-auto">
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>{session.user.name}</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/settings">Settings</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => signOut()}>
								Sign Out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</header>
	);
};
