import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "./../src/application/app";
import { BalitaTest, PemeriksaanBalitaTest, UserTest } from "./test-util";

describe("POST /api/balita/:id/pemeriksaan", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
	});

	afterEach(async () => {
		await PemeriksaanBalitaTest.delete();
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("Should be able to create pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.post(`/api/balita/${balita.id}/pemeriksaan`)
			.set("X-API-TOKEN", "test")
			.send({
				balitaId: balita.id,
				tanggal: new Date("2025-10-10"),
				berat: 4.7,
				tinggi: 120,
				lingkarKepala: 15.5,
				keterangan: "test",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.balitaId).toBe(balita.id);
		expect(response.body.data.tanggal).toBeDefined();
		expect(response.body.data.berat).toBe(4.7);
		expect(response.body.data.tinggi).toBe(120);
		expect(response.body.data.lingkarKepala).toBe(15.5);
		expect(response.body.data.keterangan).toBe("test");
	});

	it("Should be data invalid to create pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.post(`/api/balita/${balita.id}/pemeriksaan`)
			.set("X-API-TOKEN", "test")
			.send({
				balitaId: balita.id,
				tanggal: new Date("2025-10-10"),
				berat: -1,
				tinggi: -1,
				lingkarKepala: -1,
				keterangan: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("Should be unauthorized to create pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.post(`/api/balita/${balita.id}/pemeriksaan`)
			.set("X-API-TOKEN", "hi")
			.send({
				balitaId: balita.id,
				tanggal: new Date("2025-10-10"),
				berat: 4.7,
				tinggi: 120,
				lingkarKepala: 15.5,
				keterangan: "test",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/balita/pemeriksaan", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
		for (let i = 0; i < 5; i++) {
			await PemeriksaanBalitaTest.create();
		}
	});

	afterEach(async () => {
		await PemeriksaanBalitaTest.delete();
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get data balita", async () => {
		const response = await supertest(app)
			.get("/api/balita/pemeriksaan")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta.page).toBe(1);
		expect(response.body.meta.limit).toBe(10);
		expect(response.body.meta.total).toBe(5);
		expect(response.body.meta.totalPages).toBe(1);
	});

	it("should be able to search by nama", async () => {
		const response = await supertest(app)
			.get("/api/balita/pemeriksaan?search=test")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta).toBeDefined();
	});

	it("should be able to search with pagination", async () => {
		const response = await supertest(app)
			.get("/api/balita/pemeriksaan?page=1&limit=2")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(2);
		expect(response.body.meta.totalPages).toBe(3);
	});

	it("should be reject to get data balita", async () => {
		const response = await supertest(app)
			.get("/api/balita/pemeriksaan")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/balita/:id/pemeriksaan", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
		for (let i = 0; i < 5; i++) {
			await PemeriksaanBalitaTest.create();
		}
	});

	afterEach(async () => {
		await PemeriksaanBalitaTest.delete();
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get data pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}/pemeriksaan`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
	});

	it("should be rejected to get data pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}/pemeriksaan`)
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be balita not found to get data pemeriksaan balita", async () => {
		const response = await supertest(app)
			.get(`/api/balita/11111/pemeriksaan`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});

	it("should be return empty array data pemeriksaan balita", async () => {
		await PemeriksaanBalitaTest.delete();
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}/pemeriksaan`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/balita/:id/pemeriksaan/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
		await PemeriksaanBalitaTest.create();
	});

	afterEach(async () => {
		await PemeriksaanBalitaTest.delete();
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get data pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.balitaId).toBe(balita.id);
		expect(response.body.data.tanggal).toBe(
			new Date("2025-10-10").toISOString(),
		);
		expect(response.body.data.berat).toBe(4.7);
		expect(response.body.data.tinggi).toBe(120);
		expect(response.body.data.lingkarKepala).toBe(15.5);
		expect(response.body.data.keterangan).toBe("test");
	});

	it("should be rejected to get data pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be balita not found to get data pemeriksaan balita", async () => {
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/11111/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});

	it("should be return empty array data pemeriksaan balita", async () => {
		await PemeriksaanBalitaTest.delete();
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.get(`/api/balita/${balita.id}/pemeriksaan/1312`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("PATCH /api/balita/:id/pemeriksaan/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
		await PemeriksaanBalitaTest.create();
	});

	afterEach(async () => {
		await PemeriksaanBalitaTest.delete();
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to update data pemeriksaan balita", async () => {
		const balita = await BalitaTest.get();
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.patch(`/api/balita/${balita.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: new Date("2020-01-01"),
				berat: 100,
				tinggi: 170.7,
				lingkarKepala: 100,
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.balitaId).toBe(balita.id);
		expect(response.body.data.tanggal).toBe(
			new Date("2020-01-01").toISOString(),
		);
		expect(response.body.data.berat).toBe(100);
		expect(response.body.data.tinggi).toBe(170.7);
		expect(response.body.data.lingkarKepala).toBe(100);
		expect(response.body.data.keterangan).toBe("test");
	});

	it("should be data invalid", async () => {
		const balita = await BalitaTest.get();
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.patch(`/api/balita/${balita.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: "",
				berat: "",
				tinggi: "",
				lingkarKepala: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should be unauthorized", async () => {
		const balita = await BalitaTest.get();
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.patch(`/api/balita/${balita.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "hi")
			.send({
				tanggal: new Date("2020-01-01"),
				berat: 100,
				tinggi: 170.7,
				lingkarKepala: 100,
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be pemeriksaan not found", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.patch(`/api/balita/${balita.id}/pemeriksaan/1111111111`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: new Date("2020-01-01"),
				berat: 100,
				tinggi: 170.7,
				lingkarKepala: 100,
			});

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});

	it("should be balita not found", async () => {
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.patch(`/api/balita/101001/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: new Date("2020-01-01"),
				berat: 100,
				tinggi: 170.7,
				lingkarKepala: 100,
			});

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("DELETE /api/balita/:id/pemeriksaan/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
		await PemeriksaanBalitaTest.create();
	});

	afterEach(async () => {
		await BalitaTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to delete pemeriksaan data", async () => {
		const balita = await BalitaTest.get();
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.del(`/api/balita/${balita.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("Pemeriksaan berhasil dihapus");
	});

	it("should be rejected to delete pemeriksaan data", async () => {
		const balita = await BalitaTest.get();
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.del(`/api/balita/${balita.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "t");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
		await PemeriksaanBalitaTest.delete();
	});

	it("should be error balita not found", async () => {
		const pemeriksaan = await PemeriksaanBalitaTest.get();
		const response = await supertest(app)
			.del(`/api/balita/11111/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
		await PemeriksaanBalitaTest.delete();
	});

	it("should be error pemeriksaan not found", async () => {
		const balita = await BalitaTest.get();
		const response = await supertest(app)
			.del(`/api/balita/${balita.id}/pemeriksaan/1111`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
		await PemeriksaanBalitaTest.delete();
	});
});
