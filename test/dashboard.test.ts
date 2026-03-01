import supertest from "supertest";
import { logger } from "../src/app/logging";
import { app } from "./../src/application/app";
import {
	BalitaTest,
	IbuHamilTest,
	PemeriksaanBalitaTest,
	PemeriksaanIbuHamilTest,
	UserTest,
} from "./test-util";

describe("GET /api/dashboard/stats", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
		await IbuHamilTest.create();
		await PemeriksaanBalitaTest.create();
		await PemeriksaanIbuHamilTest.create();
	});

	afterEach(async () => {
		await PemeriksaanBalitaTest.delete();
		await PemeriksaanIbuHamilTest.delete();
		await BalitaTest.deleteAll();
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get dashboard stats", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/stats")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.totalBalita).toBeDefined();
		expect(response.body.data.totalIbuHamil).toBeDefined();
		expect(response.body.data.pemeriksaanBulanIni).toBeDefined();
		expect(response.body.data.perubahanBalita).toBeDefined();
		expect(response.body.data.perubahanIbuHamil).toBeDefined();
		expect(response.body.data.perubahanPemeriksaan).toBeDefined();
		expect(typeof response.body.data.totalBalita).toBe("number");
		expect(typeof response.body.data.totalIbuHamil).toBe("number");
	}, 10000);

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/stats")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	}, 10000);
});

describe("GET /api/dashboard/chart", () => {
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

	it("should be able to get dashboard chart", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/chart")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBe(true);
		expect(response.body.data.length).toBe(8);
		expect(response.body.data[0].bulan).toBeDefined();
		expect(response.body.data[0].beratRata).toBeDefined();
		expect(response.body.data[0].tinggiRata).toBeDefined();
	}, 10000);

	it("should be able to get dashboard chart with tahun", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/chart?tahun=2025")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBe(true);
		expect(response.body.data.length).toBe(8);
	}, 10000);

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/chart")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	}, 10000);
});

describe("GET /api/dashboard/recent-exams", () => {
	beforeEach(async () => {
		await UserTest.create();
		await BalitaTest.create();
		await IbuHamilTest.create();
		await PemeriksaanBalitaTest.create();
		await PemeriksaanIbuHamilTest.create();
	});

	afterEach(async () => {
		await PemeriksaanBalitaTest.delete();
		await PemeriksaanIbuHamilTest.delete();
		await BalitaTest.deleteAll();
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get recent exams", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/recent-exams")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBe(true);
		expect(response.body.data[0].tipe).toBeDefined();
		expect(response.body.data[0].nama).toBeDefined();
		expect(response.body.data[0].tanggal).toBeDefined();
		expect(response.body.data[0].berat).toBeDefined();
		expect(response.body.data[0].tinggi).toBeDefined();
	}, 10000);

	it("should be able to get recent exams with limit", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/recent-exams?limit=1")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBeLessThanOrEqual(1);
	}, 10000);

	it("should be able to get recent exams tipe balita", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/recent-exams")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		const balita = response.body.data.filter(
			(item: { tipe: string }) => item.tipe === "Balita",
		);
		expect(balita.length).toBeGreaterThan(0);
	}, 10000);

	it("should be able to get recent exams tipe ibu hamil", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/recent-exams")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		const ibuHamil = response.body.data.filter(
			(item: { tipe: string }) => item.tipe === "Ibu Hamil",
		);
		expect(ibuHamil.length).toBeGreaterThan(0);
	}, 10000);

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.get("/api/dashboard/recent-exams")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	}, 10000);
});
