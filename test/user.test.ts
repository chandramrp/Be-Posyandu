import bcrypt from "bcrypt";
import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "./../src/application/app";
import { UserTest } from "./test-util";

describe("POST /api/users", () => {
	afterEach(async () => {
		await UserTest.delete();
	});

	it("should reject register user if request is invalid", async () => {
		const response = await supertest(app).post("/api/users").send({
			nama: "",
			email: "",
			password: "",
			role: "",
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should register user", async () => {
		const response = await supertest(app).post("/api/users").send({
			nama: "test",
			email: "test@test.id",
			password: "test",
			role: "Kader",
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.nama).toBe("test");
		expect(response.body.data.email).toBe("test@test.id");
		expect(response.body.data.role).toBe("Kader");
	});
});

describe("POST /api/users/login", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to login", async () => {
		const response = await supertest(app).post("/api/users/login").send({
			email: "test@test.id",
			password: "test",
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.nama).toBe("test");
		expect(response.body.data.email).toBe("test@test.id");
		expect(response.body.data.role).toBe("Kader");
		expect(response.body.data.token).toBeDefined();
	});

	it("should reject user to login", async () => {
		const response = await supertest(app).post("/api/users/login").send({
			email: "test1@test.id",
			password: "test1",
		});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/users", () => {
	beforeEach(async () => {
		await UserTest.createMultiple(5);
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to get data users", async () => {
		const response = await supertest(app)
			.get("/api/users")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta.page).toBe(1);
		expect(response.body.meta.limit).toBe(5);
		expect(response.body.meta.total).toBe(5);
		expect(response.body.meta.totalPages).toBe(1);
	});

	it("should be able to search by nama", async () => {
		const response = await supertest(app)
			.get("/api/users?search=test")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(5);
		expect(response.body.meta).toBeDefined();
	});

	it("should be able to filter by jenis email", async () => {
		const user = await UserTest.get();
		const response = await supertest(app)
			.get(`/api/users?email=${user.email}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.meta).toBeDefined();
	});

	it("should be able to search with pagination", async () => {
		const response = await supertest(app)
			.get("/api/users?page=1&limit=2")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(2);
		expect(response.body.meta.totalPages).toBe(3);
	});

	it("should be reject to get data users", async () => {
		const response = await supertest(app)
			.get("/api/users")
			.set("X-API-TOKEN", "hi");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("GET /api/users/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to get user detail", async () => {
		const response = await supertest(app)
			.get("/api/users/current")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.nama).toBe("test");
		expect(response.body.data.email).toBe("test@test.id");
		expect(response.body.data.role).toBe("Kader");
	});

	it("should rejected to get user detail token invalid", async () => {
		const response = await supertest(app)
			.get("/api/users/current")
			.set("X-API-TOKEN", "hai");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe("PATCH /api/users/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be reject user to update data  request is invalid", async () => {
		const response = await supertest(app)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "test")
			.send({
				password: "",
				name: "",
			});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it("should be reject user to update data token is wrong", async () => {
		const response = await supertest(app)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "hai")
			.send({
				password: "q31242342",
				name: "dudung",
			});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

	it("should be able user to update data user name", async () => {
		const response = await supertest(app)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "test")
			.send({
				nama: "dudung",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.nama).toBe("dudung");
	});

	it("should be able user to update data user password", async () => {
		const response = await supertest(app)
			.patch("/api/users/current")
			.set("X-API-TOKEN", "test")
			.send({
				password: "chan",
			});

		logger.debug(response.body);
		expect(response.status).toBe(200);

		const user = await UserTest.get();
		expect(await bcrypt.compare("chan", user.password)).toBe(true);
	});
});

describe("DELETE /api/users/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to logut", async () => {
		const response = await supertest(app)
			.delete("/api/users/current")
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("Ok");

		const user = await UserTest.get();
		expect(user.token).toBeNull();
	});

	it("should be unauthorized", async () => {
		const response = await supertest(app)
			.delete("/api/users/current")
			.set("X-API-TOKEN", "hai");

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined;
	});
});

describe("DELETE /api/users/:id", () => {
	beforeEach(async () => {
		await UserTest.delete();
		await UserTest.create();
	});

	it("should be able to delete user", async () => {
		const user = await UserTest.get();
		const response = await supertest(app)
			.delete(`/api/users/${user.id}`)
			.set("X-API-TOKEN", "test");

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe("Berhasil dihapus");
	});
});
