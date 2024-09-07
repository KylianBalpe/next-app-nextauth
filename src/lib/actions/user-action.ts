"use server";

import { SignInRequest, SignUpRequest } from "../model/user-model";
import { prisma } from "../prisma";
import { Argon2id } from "oslo/password";

export const signUp = async (request: SignUpRequest) => {
	try {
		const hashPassword = await new Argon2id().hash(request.password);
		const user = prisma.user.create({
			data: {
				name: request.name,
				email: request.email,
				password: hashPassword,
			},
		});

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const signIn = async (request: SignInRequest) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: request.email,
			},
		});

		if (!user) return null;

		const isValid = await new Argon2id().verify(
			user.password!,
			request.password
		);

		if (!isValid) return null;

		return user;
	} catch (error) {
		console.error(error);
		return null;
	}
};
