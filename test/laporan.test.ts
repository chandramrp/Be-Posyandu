import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "./../src/application/app";
import {
	BalitaTest,
	IbuHamilTest,
	PemeriksaanBalitaTest,
	PemeriksaanIbuHamilTest,
	UserTest,
} from "./test-util";

describe("GET /api/laporan/balita", () => {
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

	it("should be able to get laporan balita", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(response.body.meta.page).toBe(1);
		expect(response.body.meta.limit).toBe(10);
		expect(response.body.meta.total).toBeDefined();
		expect(response.body.meta.totalPages).toBeDefined();
	});

	it("should be able to get laporan balita with pagination", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita?bulan=10&tahun=2025&page=1&limit=5")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(response.body.meta.limit).toBe(5);
	});

	it("should return empty when no data on that month", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita?bulan=1&tahun=2020")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.meta.total).toBe(0);
	});

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be rejected if bulan and tahun not provided", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/laporan/balita/export", () => {
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

	it("should be able to export laporan balita", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita/export?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBe(true);
	});

	it("should return empty when no data", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita/export?bulan=1&tahun=2020")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
	});

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita/export?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be rejected if bulan and tahun not provided", async () => {
		const response = await supertest(app)
			.get("/api/laporan/balita/export")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/laporan/ibu-hamil", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
		await PemeriksaanIbuHamilTest.create();
	});

	afterEach(async () => {
		await PemeriksaanIbuHamilTest.delete();
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get laporan ibu hamil", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(response.body.meta.page).toBe(1);
		expect(response.body.meta.limit).toBe(10);
		expect(response.body.meta.total).toBeDefined();
		expect(response.body.meta.totalPages).toBeDefined();
	});

	it("should be able to get laporan ibu hamil with pagination", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil?bulan=10&tahun=2025&page=1&limit=5")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(response.body.meta.limit).toBe(5);
	});

	it("should return empty when no data on that month", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil?bulan=1&tahun=2020")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.meta.total).toBe(0);
	});

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be rejected if bulan and tahun not provided", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/laporan/ibu-hamil/export", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
		await PemeriksaanIbuHamilTest.create();
	});

	afterEach(async () => {
		await PemeriksaanIbuHamilTest.delete();
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to export laporan ibu hamil", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil/export?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(Array.isArray(response.body.data)).toBe(true);
	});

	it("should return empty when no data", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil/export?bulan=1&tahun=2020")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
	});

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil/export?bulan=10&tahun=2025")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be rejected if bulan and tahun not provided", async () => {
		const response = await supertest(app)
			.get("/api/laporan/ibu-hamil/export")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});
