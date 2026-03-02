import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "./../src/application/app";
import { IbuHamilTest, PemeriksaanIbuHamilTest, UserTest } from "./test-util";

describe("POST /api/ibuhamil/:id/pemeriksaan", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
	});

	afterEach(async () => {
		await PemeriksaanIbuHamilTest.delete();
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to create pemeriksaan ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.post(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan`)
			.send({
				ibuHamilId: ibuHamil.id,
				tanggal: new Date("2025-10-10"),
				usiaKehamilan: 40,
				berat: 60,
				tinggi: 170,
				tensi: "120/90",
				keterangan: "test",
			})
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.ibuHamilId).toBe(ibuHamil.id);
		expect(response.body.data.tanggal).toBe(
			new Date("2025-10-10").toISOString(),
		);
		expect(response.body.data.usiaKehamilan).toBe(40);
		expect(response.body.data.berat).toBe(60);
		expect(response.body.data.tinggi).toBe(170);
		expect(response.body.data.tensi).toBe("120/90");
		expect(response.body.data.keterangan).toBe("test");
	});
	it("should be unauthorized", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.post(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan`)
			.set("X-API-TOKEN", "hi")
			.send({
				tanggal: new Date("2025-10-10"),
				usiaKehamilan: 40,
				berat: 60,
				tinggi: 170,
				tensi: "120/90",
				keterangan: "test",
			});

		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be data invalid", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.post(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan`)
			.set("X-API-TOKEN", "test")
			.send({
				usiaKehamilan: -1,
				berat: -1,
				tinggi: -1,
				tensi: "",
			});

		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should be ibu hamil not found", async () => {
		const response = await supertest(app)
			.post(`/api/ibuhamil/99999/pemeriksaan`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: new Date("2025-10-10"),
				usiaKehamilan: 40,
				berat: 60,
				tinggi: 170,
				tensi: "120/90",
			});

		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/ibuhamil/pemeriksaan", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
		for (let i = 0; i < 5; i++) {
			await PemeriksaanIbuHamilTest.create();
		}
	});

	afterEach(async () => {
		await PemeriksaanIbuHamilTest.delete();
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get data ibuhamil", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil/pemeriksaan")
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
			.get("/api/ibuhamil/pemeriksaan?search=test")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta).toBeDefined();
	});

	it("should be able to search with pagination", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil/pemeriksaan?page=1&limit=2")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(2);
		expect(response.body.meta.totalPages).toBe(3);
	});

	it("should be reject to get data ibuhamil", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil/pemeriksaan")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/ibuhamil/:id/pemeriksaan/:id", () => {
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

	it("should be able to get data pemeriksaan ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBe(pemeriksaan.id);
		expect(response.body.data.ibuHamilId).toBe(ibuHamil.id);
		expect(response.body.data.tanggal).toBe(
			new Date("2025-10-10").toISOString(),
		);
		expect(response.body.data.usiaKehamilan).toBe(40);
		expect(response.body.data.berat).toBe(60);
		expect(response.body.data.tinggi).toBe(170);
		expect(response.body.data.tensi).toBe("120/90");
		expect(response.body.data.keterangan).toBe("test");
	});

	it("should be unauthorized", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be ibu hamil not found", async () => {
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/12/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});

	it("should be pemeriksaan not found", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/999`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/ibuhamil/:id/pemeriksaan", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
		await PemeriksaanIbuHamilTest.createMany(5);
	});

	afterEach(async () => {
		await PemeriksaanIbuHamilTest.delete();
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get list pemeriksaan ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
	});

	it("should be reejcted to get list pemeriksaan ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan`)
			.set("X-API-TOKEN", "t");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be pemeriksaan ibu hamil not found", async () => {
		await PemeriksaanIbuHamilTest.delete();
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("PATCH /api/ibuhamil/:id/pemeriksaan/:id", () => {
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

	it("should be able to update pemeriksaan ibu  hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: new Date("2024-10-10"),
				usiaKehamilan: 80,
				berat: 100,
				tinggi: 170,
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.tanggal).toBe(
			new Date("2024-10-10").toISOString(),
		);
		expect(response.body.data.usiaKehamilan).toBe(80);
		expect(response.body.data.berat).toBe(100);
		expect(response.body.data.tinggi).toBe(170);
	});

	it("should be reject to update pemeriksaan ibu  hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: "",
				usiaKehamilan: "",
				berat: "",
				tinggi: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should be reject to update pemeriksaan ibu  hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "t")
			.send({
				tanggal: new Date("2024-10-10"),
				usiaKehamilan: 80,
				berat: 100,
				tinggi: 170,
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be pemeriksaan not found", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/97989`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: new Date("2024-10-10"),
				usiaKehamilan: 80,
				berat: 100,
				tinggi: 170,
			});

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});

	it("should be ibu hamil not found", async () => {
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/1231/pemeriksaan/${pemeriksaan.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				tanggal: new Date("2024-10-10"),
				usiaKehamilan: 80,
				berat: 100,
				tinggi: 170,
			});

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe("DELETE /api/ibuhamil/:id/pemeriksaan/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
		await PemeriksaanIbuHamilTest.create();
	});

	afterEach(async () => {
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to delete data pemeriksaan ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.delete(
				`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/${pemeriksaan.id}`,
			)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("Pemeriksaan berhasil dihapus");
	});

	it("should be rejected to delete data pemeriksaan ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const pemeriksaan = await PemeriksaanIbuHamilTest.get();
		const response = await supertest(app)
			.delete(
				`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/${pemeriksaan.id}`,
			)
			.set("X-API-TOKEN", "t");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
		await PemeriksaanIbuHamilTest.delete();
	});

	it("should be pemeriksaan not found", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.delete(`/api/ibuhamil/${ibuHamil.id}/pemeriksaan/535`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
		await PemeriksaanIbuHamilTest.delete();
	});

	it("should be ibu hamil not found", async () => {
		const response = await supertest(app)
			.delete(`/api/ibuhamil/3134444/pemeriksaan/535`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
		await PemeriksaanIbuHamilTest.delete();
	});
});
