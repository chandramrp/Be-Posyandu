import {
	Balita,
	IbuHamil,
	PemeriksaanBalita,
	PemeriksaanIbuHamil,
	User,
} from "@prisma/client";
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
				posyandu: "test",
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
		const balita = await BalitaTest.get();
		await prismaClient.pemeriksaanBalita.deleteMany({
			where: {
				balitaId: balita.id,
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

export class PemeriksaanIbuHamilTest {
	static async delete() {
		await prismaClient.pemeriksaanIbuHamil.deleteMany({
			where: {
				keterangan: "test",
			},
		});
	}

	static async create() {
		const ibuHamil = await IbuHamilTest.get();
		await prismaClient.pemeriksaanIbuHamil.create({
			data: {
				ibuHamilId: ibuHamil.id,
				tanggal: new Date("2025-10-10"),
				usiaKehamilan: 40,
				berat: 60,
				tinggi: 170,
				tensi: "120/90",
				keterangan: "test",
			},
		});
	}

	static async createMany(amount: number) {
		const ibuHamil = await IbuHamilTest.get();
		for (let i = 0; i < amount; i++) {
			await prismaClient.pemeriksaanIbuHamil.create({
				data: {
					ibuHamilId: ibuHamil.id,
					tanggal: new Date("2025-10-10"),
					usiaKehamilan: 40,
					berat: 60,
					tinggi: 170,
					tensi: "120/90",
					keterangan: "test",
				},
			});
		}
	}

	static async get(): Promise<PemeriksaanIbuHamil> {
		const response = await prismaClient.pemeriksaanIbuHamil.findFirst({
			where: {
				keterangan: "test",
			},
		});

		if (!response) {
			throw new ResponseError(404, "Pemeriksaan not found");
		}

		return response;
	}
}
