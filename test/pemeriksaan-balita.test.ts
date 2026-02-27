import supertest from "supertest";
import { logger } from "../src/app/logging";
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
