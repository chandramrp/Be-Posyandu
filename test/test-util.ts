import bcrypt from "bcrypt";
import { prismaClient } from "../src/app/database";
import { User } from "@prisma/client";

export class UserTest {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				email: "test@test.id",
			},
		});
	}

	static async create() {
		await prismaClient.user.create({
			data: {
				nama: "test",
				email: "test@test.id",
				password: await bcrypt.hash("test", 10),
				role: "Kader",
				token: "test",
			},
		});
	}

	static async get(): Promise<User> {
		const user = await prismaClient.user.findFirst({
			where: {
				email: "test@test.id",
			},
		});

		if (!user) {
			throw new Error("User is not found");
		}

		return user;
	}
}
