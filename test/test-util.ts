import { Balita, IbuHamil, PemeriksaanBalita, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { prismaClient } from "../src/app/database";
import { ResponseError } from "../src/error/response-error";

export class UserTest {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				role: "Kader",
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

	static async createMultiple(amount: number) {
		for (let i = 0; i < amount; i++) {
			await prismaClient.user.create({
				data: {
					nama: "test",
					email: `test${i}@test.id`,
					password: await bcrypt.hash("test", 10),
					role: "Kader",
					token: "test",
				},
			});
		}
	}

	static async get(): Promise<User> {
		const user = await prismaClient.user.findFirst({
			where: {
				nama: "test",
			},
		});

		if (!user) {
			throw new ResponseError(404, "User is not found");
		}

		return user;
	}
}

export class BalitaTest {
	static async deleteAll() {
		await prismaClient.balita.deleteMany({
			where: {
				namaOrtu: "test",
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

export class IbuHamilTest {
	static async deleteAll() {
		await prismaClient.ibuHamil.deleteMany({
			where: {
				nama: "test",
			},
		});
	}

	static async create() {
		await prismaClient.ibuHamil.create({
			data: {
				nama: "test",
				namaSuami: "test",
				tanggalLahir: new Date("2000-01-01"),
				usiaKehamilan: 20,
				golDarah: "O",
				alamat: "test",
				posyandu: "test",
			},
		});
	}

	static async get(): Promise<IbuHamil> {
		const response = await prismaClient.ibuHamil.findFirst({
			where: {
				nama: "test",
			},
		});

		if (!response) {
			throw new ResponseError(404, "Ibu hamil is not found");
		}

		return response;
	}
}

export class PemeriksaanBalitaTest {
	static async delete() {
		await prismaClient.pemeriksaanBalita.deleteMany({
			where: {
				keterangan: "test",
				tinggi: 120,
			},
		});
	}

	static async create() {
		const balitaId = await BalitaTest.get();
		await prismaClient.pemeriksaanBalita.create({
			data: {
				balitaId: balitaId.id,
				tanggal: new Date("2025-10-10"),
				berat: 4.7,
				tinggi: 120,
				lingkarKepala: 15.5,
				keterangan: "test",
			},
		});
	}

	static async get(): Promise<PemeriksaanBalita> {
		const response = await prismaClient.pemeriksaanBalita.findFirst({
			where: {
				keterangan: "test",
			},
		});

		if (!response) {
			throw new ResponseError(404, "Pemeriksaan balita not found");
		}

		return response;
	}
}
