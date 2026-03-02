import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "./../src/application/app";
import { IbuHamilTest, UserTest } from "./test-util";
describe("POST /api/ibuhamil", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});
	it("should be able to create ibu hamil", async () => {
		const response = await supertest(app)
			.post("/api/ibuhamil")
			.set("X-API-TOKEN", "test")
			.send({
				nama: "test",
				namaSuami: "test",
				tanggalLahir: new Date("2000-01-01"),
				usiaKehamilan: 20,
				golDarah: "O",
				alamat: "test",
				posyandu: "test",
			});

		logger.debug(response.body);
		expect(response.body.data.nama).toBe("test");
		expect(response.body.data.namaSuami).toBe("test");
		expect(response.body.data.tanggalLahir).toBeDefined();
		expect(response.body.data.golDarah).toBe("O");
		expect(response.body.data.alamat).toBe("test");
		expect(response.body.data.posyandu).toBe("test");
	});

	it("should be invalid to create ibu hamil data", async () => {
		const response = await supertest(app)
			.post("/api/ibuhamil")
			.set("X-API-TOKEN", "hi")
			.send({
				nama: "test",
				namaSuami: "test",
				tanggalLahir: new Date("2000-01-01"),
				usiaKehamilan: 20,
				golDarah: "O",
				alamat: "test",
				posyandu: "test",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be unauthorized to create data", async () => {
		const response = await supertest(app)
			.post("/api/ibuhamil")
			.set("X-API-TOKEN", "test")
			.send({
				nama: "",
				namaSuami: "",
				tanggalLahir: new Date("2000-01-01"),
				usiaKehamilan: 20,
				golDarah: "O",
				alamat: "",
				posyandu: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/ibuhamil", () => {
	beforeEach(async () => {
		await UserTest.create();
		for (let index = 0; index < 5; index++) {
			await IbuHamilTest.create();
		}
	});

	afterEach(async () => {
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get all data ibu hamil", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta.total).toBe(5);
		expect(response.body.meta.page).toBe(1);
		expect(response.body.meta.totalPages).toBe(1);
	});

	it("should be able to search by nama", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil?search=test")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta).toBeDefined();
	});

	it("should be able to search by nama suami", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil?search=test")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta).toBeDefined();
	});

	it("should be able to search with pagination", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil?page=1&limit=2")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(2);
		expect(response.body.meta.totalPages).toBe(3);
	});

	it("should return empty when search not found", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil?search=tidakada")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.meta.total).toBe(0);
	});

	it("should be rejected to get all data ibu hamil", async () => {
		const response = await supertest(app)
			.get("/api/ibuhamil")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/ibuhamil/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
	});

	afterEach(async () => {
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to get ibuhamil data", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.body.data.nama).toBe("test");
		expect(response.body.data.namaSuami).toBe("test");
		expect(response.body.data.tanggalLahir).toBeDefined();
		expect(response.body.data.golDarah).toBe("O");
		expect(response.body.data.alamat).toBe("test");
		expect(response.body.data.posyandu).toBe("test");
	});

	it("should be reject to get ibuhamil data token invalid", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.get(`/api/ibuhamil/${ibuHamil.id}`)
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("PATCH /api/ibuhamil/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
	});

	afterEach(async () => {
		await IbuHamilTest.deleteAll();
		await UserTest.delete();
	});

	it("should be able to update data suami ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/${ibuHamil.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				namaSuami: "dudung",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.namaSuami).toBe("dudung");
	});

	it("should be invalid data", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/${ibuHamil.id}`)
			.set("X-API-TOKEN", "test")
			.send({
				namaSuami: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should be unauthorized", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.patch(`/api/ibuhamil/${ibuHamil.id}`)
			.set("X-API-TOKEN", "hi")
			.send({
				namaSuami: "mamat",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("DELETE /api/ibuhamil/:id", () => {
	beforeEach(async () => {
		await UserTest.create();
		await IbuHamilTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to delete data ibu hamil", async () => {
		const ibuHamil = await IbuHamilTest.get();
		const response = await supertest(app)
			.delete(`/api/ibuhamil/${ibuHamil.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("Data ibu hamil berhasil dihapus");
	});
});
