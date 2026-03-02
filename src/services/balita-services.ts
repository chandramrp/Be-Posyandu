import { Balita } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
	BalitaQuery,
	BalitaResponse,
	CreateBalitaRequest,
	toBalitaResponse,
	UpdateBalitaRequest,
} from "../models/balita-model";
import { Paginated } from "../models/page";
import { BalitaValidation } from "../validation/balita-validation";
import { Validation } from "../validation/validation";

export class BalitaService {
	static async register(
		request: CreateBalitaRequest,
	): Promise<BalitaResponse> {
		const registerBalita = Validation.validate(
			BalitaValidation.REGISTER,
			request,
		);

		const balita = await prismaClient.balita.create({
			data: registerBalita,
		});

		return toBalitaResponse(balita);
	}

	static async getAll(
		query: BalitaQuery,
	): Promise<Paginated<BalitaResponse[]>> {
		const searchRequest = Validation.validate(
			BalitaValidation.QUERY,
			query,
		);
		const { search, jenisKelamin, page, limit } = searchRequest;
		const skip = (page - 1) * limit;

		const where = {
			AND: [
				search
					? {
							OR: [
								{
									nama: { contains: search },
								},
								{
									namaOrtu: {
										contains: search,
									},
								},
							],
						}
					: {},
				jenisKelamin ? { jenisKelamin } : {},
			],
		};

		const [data, total] = await Promise.all([
			prismaClient.balita.findMany({
				where,
				skip,
				take: limit,
				orderBy: {
					createdAt: "desc",
				},
			}),
			prismaClient.balita.count({
				where,
			}),
		]);

		return {
			data: data.map((balita) => toBalitaResponse(balita)),
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	static async checkBalitaMustExsist(id: number): Promise<Balita> {
		const balita = await prismaClient.balita.findUnique({
			where: {
				id: id,
			},
		});

		if (!balita) {
			throw new ResponseError(404, "Balita not found");
		}

		return balita;
	}

	static async get(id: number): Promise<BalitaResponse> {
		const dataBalita = await this.checkBalitaMustExsist(id);
		return toBalitaResponse(dataBalita);
	}

	static async update(
		id: number,
		request: UpdateBalitaRequest,
	): Promise<BalitaResponse> {
		const updateRequest = Validation.validate(
			BalitaValidation.UPDATE,
			request,
		);

		const dataBalita = await this.checkBalitaMustExsist(id);

		if (updateRequest.nama) {
			dataBalita.nama = updateRequest.nama;
		}

		if (updateRequest.tanggalLahir) {
			dataBalita.tanggalLahir = updateRequest.tanggalLahir;
		}

		if (updateRequest.jenisKelamin) {
			dataBalita.jenisKelamin = updateRequest.jenisKelamin;
		}

		if (updateRequest.namaOrtu) {
			dataBalita.namaOrtu = updateRequest.namaOrtu;
		}

		if (updateRequest.alamat) {
			dataBalita.alamat = updateRequest.alamat;
		}

		const result = await prismaClient.balita.update({
			where: {
				id: id,
			},
			data: dataBalita,
		});

		return toBalitaResponse(result);
	}

	static async remove(id: number) {
		await this.checkBalitaMustExsist(id);

		const balita = await prismaClient.balita.delete({
			where: {
				id: id,
			},
		});
	}
}
