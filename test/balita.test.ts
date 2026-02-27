import supertest from "supertest";
import { logger } from "../src/app/logging";
import { app } from "./../src/application/app";
import { BalitaTest, UserTest } from "./test-util";

describe("POST /api/balita", () => {
	beforeEach(async () => {
		await UserTest.create();
	});
	afterEach(async () => {
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to create balita", async () => {
		const response = await supertest(app)
			.post("/api/balita")
			.set("X-API-TOKEN", "test")
			.send({
				nama: "test",
				tanggalLahir: "2025-12-19",
				jenisKelamin: "Laki_laki",
				namaOrtu: "test",
				alamat: "test",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.nama).toBe("test");
		expect(response.body.data.tanggalLahir).toBeDefined();
		expect(response.body.data.jenisKelamin).toBe("Laki_laki");
		expect(response.body.data.namaOrtu).toBe("test");
		expect(response.body.data.alamat).toBe("test");
	});

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.post("/api/balita")
			.set("X-API-TOKEN", "hai")
			.send({
				nama: "test",
				tanggalLahir: "2025-12-19",
				jenisKelamin: "Laki_laki",
				namaOrtu: "test",
				alamat: "test",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/balita", () => {
	beforeEach(async () => {
		await UserTest.create();
		for (let i = 0; i < 5; i++) {
			await BalitaTest.create();
		}
	});

	afterEach(async () => {
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get data balita", async () => {
		const response = await supertest(app)
			.get("/api/balita")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
	});

	it("should be reject to get data balita", async () => {
		const response = await supertest(app)
			.get("/api/balita")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/balita/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
	});

	afterEach(async () => {
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get data balita", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.body.data.nama).toBe(balita.nama);
		expect(response.body.data.tanggalLahir).toBeDefined();
	});

	it("should be rejected to get data balita", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}`)
			.set("X-API-TOKEN", "hai");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("PATCH /api/balita/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
	});

	afterEach(async () => {
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to update data balita name", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.patch(`/api/balita/${balita.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				nama: "dudung",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.nama).toBe("dudung");
	});
});

describe("DELETE /api/balita/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to delete balita data", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.delete(`/api/balita/${balita.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("Berhasil dihapus");
	});

	it("should be rejected token invalid", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.delete(`/api/balita/${balita.id}`)
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});
