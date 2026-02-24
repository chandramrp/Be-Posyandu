import { response } from "express";
import bcrypt from "bcrypt";
import { logger } from "../src/app/logging";
import { app } from "./../src/app/app";
import supertest from "supertest";
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
