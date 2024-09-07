"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateName = async (name: string) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		return null;
	}

	try {
		const profile = await prisma.user.update({
			where: {
				id: Number(session.user.id),
			},
			data: {
				name,
			},
		});

		revalidatePath("/", "layout");
		return profile;
	} catch (error) {
		console.error(error);
		return null;
	}
};
