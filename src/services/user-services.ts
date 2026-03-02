import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Paginated } from "../models/page";
import {
	CreateUserRequest,
	LoginUserRequest,
	SearchUserRequest,
	toUserResponse,
	UpdateUserRequest,
	UserResponse,
} from "../models/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
	static async register(request: CreateUserRequest): Promise<UserResponse> {
		const registerRequest = Validation.validate(
			UserValidation.REGISTER,
			request,
		);

		const totalSameEmail = await prismaClient.user.count({
			where: {
				email: registerRequest.email,
			},
		});

		if (totalSameEmail != 0) {
			throw new ResponseError(400, "Username already exists");
		}

		registerRequest.password = await bcrypt.hash(
			registerRequest.password,
			10,
		);

		const user = await prismaClient.user.create({
			data: registerRequest,
		});

		return toUserResponse(user);
	}

	static async checkUserMustExist(email: string): Promise<User> {
		const result = await prismaClient.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!result) {
			throw new ResponseError(401, "Username or password is wrong");
		}

		return result;
	}

	static async login(request: LoginUserRequest): Promise<UserResponse> {
		const loginRequest = Validation.validate(UserValidation.LOGIN, request);

		let user = await this.checkUserMustExist(loginRequest.email);

		const isPasswordValid = await bcrypt.compare(
			loginRequest.password,
			user.password,
		);

		if (!isPasswordValid) {
			throw new ResponseError(401, "Username or password is wrong");
		}

		user = await prismaClient.user.update({
			where: {
				email: loginRequest.email,
			},
			data: {
				token: uuid(),
			},
		});

		const response = toUserResponse(user);
		response.token = user.token!;
		return response;
	}

	static async getAll(
		request: SearchUserRequest,
	): Promise<Paginated<UserResponse[]>> {
		const validRequest = Validation.validate(UserValidation.QUERY, request);
		const { search, page, limit } = validRequest;
		const skip = (page - 1) * limit;

		const filters: Prisma.UserWhereInput[] = [];
		if (search) {
			filters.push({
				OR: [
					{ nama: { contains: search } },
					{ email: { contains: search } },
				],
			});
		}
		const where = {
			AND: filters,
		};

		const [data, total] = await Promise.all([
			prismaClient.user.findMany({
				where,
				skip,
				take: limit,
				orderBy: {
					createdAt: "desc",
				},
			}),
			prismaClient.user.count({ where }),
		]);

		return {
			data: data.map((user) => toUserResponse(user)),
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	static async get(user: User): Promise<UserResponse> {
		return toUserResponse(user);
	}

	static async update(
		user: User,
		request: UpdateUserRequest,
	): Promise<UserResponse> {
		const updateRequest = Validation.validate(
			UserValidation.UPDATE,
			request,
		);

		if (updateRequest.nama) {
			user.nama = updateRequest.nama;
		}

		if (updateRequest.email) {
			user.email = updateRequest.email;
		}

		if (updateRequest.password) {
			user.password = await bcrypt.hash(updateRequest.password, 10);
		}

		if (updateRequest.role) {
			user.role = updateRequest.role;
		}

		if (updateRequest.status) {
			user.status = updateRequest.status;
		}

		const result = await prismaClient.user.update({
			where: {
				email: user.email,
			},
			data: user,
		});

		return toUserResponse(result);
	}

	static async logout(user: User): Promise<UserResponse> {
		const result = await prismaClient.user.update({
			where: {
				email: user.email,
			},
			data: {
				token: null,
			},
		});

		return toUserResponse(result);
	}

	static async remove(id: number) {
		const user = await prismaClient.user.findUnique({
			where: {
				id: id,
			},
		});

		await this.checkUserMustExist(user!.email);

		await prismaClient.user.delete({
			where: {
				email: user!.email,
			},
		});
	}
}
