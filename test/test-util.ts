import bcrypt from "bcrypt";
import { prismaClient } from "../src/app/database";
import { Balita, User } from "@prisma/client";

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

export class BalitaTest {
	static async deleteAll() {
		await prismaClient.balita.deleteMany({
			where: {
				nama: "test",
			},
		});
	}

	static async create() {
		await prismaClient.balita.create({
			data: {
				nama: "test",
				tanggalLahir: new Date("2025-12-19"),
				jenisKelamin: "Perempuan",
				namaOrtu: "test",
				alamat: "test",
			},
		});
	}

	static async get(): Promise<Balita> {
		const balita = await prismaClient.balita.findFirst({
			where: {
				nama: "test",
			},
		});

		if (!balita) {
			throw new Error("Balita is not found");
		}

		return balita;
	}
}
