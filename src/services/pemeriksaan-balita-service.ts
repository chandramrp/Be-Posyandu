import { PemeriksaanBalita } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { ResponseError } from "../error/response-error";
import { Paginated } from "../models/page";
import {
	CreatePemeriksaanBalitaRequest,
	PemeriksaanBalitaQuery,
	PemeriksaanBalitaResponse,
	toPemeriksaanBalitaResponse,
	UpdatePemeriksaanBalitaRequest,
} from "../models/pemeriksaan-balita-model";
import { PemeriksaanBalitaValidation } from "../validation/pemeriksaan-balita-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "./../app/database";

export class PemeriksaanBalitaService {
	static async create(
		request: CreatePemeriksaanBalitaRequest,
	): Promise<PemeriksaanBalitaResponse> {
		const pemeriksaanBalitaRequest = Validation.validate(
			PemeriksaanBalitaValidation.CREATE,
			request,
		);

		const result = await prismaClient.pemeriksaanBalita.create({
			data: pemeriksaanBalitaRequest,
		});

		return toPemeriksaanBalitaResponse(result);
	}

	static async getAllByid(
		balitaId: number,
	): Promise<PemeriksaanBalitaResponse[]> {
		const response = await prismaClient.pemeriksaanBalita.findMany({
			where: {
				balitaId: balitaId,
			},
		});

		if (response.length === 0) {
			throw new ResponseError(404, "Pemeriksaan not found");
		}
		return response.map((data) => toPemeriksaanBalitaResponse(data));
	}

	static async checkPemeriksaanMustExist(
		id: number,
	): Promise<PemeriksaanBalita> {
		const response = await prismaClient.pemeriksaanBalita.findUnique({
			where: {
				id: id,
			},
		});

		if (!response) {
			throw new ResponseError(404, "Pemeriksaan not found");
		}

		return response;
	}

	static async getAll(
		query: PemeriksaanBalitaQuery,
	): Promise<Paginated<PemeriksaanBalitaResponse[]>> {
		const validQuery = Validation.validate(
			PemeriksaanBalitaValidation.QUERY,
			query,
		);
		const { search, page, limit } = validQuery;
		const skip = (page - 1) * limit;

		const where = {
			AND: [
				search
					? {
							OR: [
								{
									balita: { nama: search },
								},
							],
						}
					: {},
			],
		};

		const [data, total] = await Promise.all([
			prismaClient.pemeriksaanBalita.findMany({
				where,
				skip,
				take: limit,
				orderBy: {
					createdAt: "desc",
				},
			}),

			prismaClient.pemeriksaanBalita.count({ where }),
		]);

		return {
			data: data.map((pemeriksaan) =>
				toPemeriksaanBalitaResponse(pemeriksaan),
			),
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	static async get(id: number): Promise<PemeriksaanBalitaResponse> {
		const response = await this.checkPemeriksaanMustExist(id);
		return toPemeriksaanBalitaResponse(response);
	}

	static async update(
		id: number,
		request: UpdatePemeriksaanBalitaRequest,
	): Promise<PemeriksaanBalitaResponse> {
		const updateRequest = Validation.validate(
			PemeriksaanBalitaValidation.UPDATE,
			request,
		);
		const response = await this.checkPemeriksaanMustExist(id);

		if (updateRequest.tanggal) {
			response.tanggal = updateRequest.tanggal;
		}

		if (updateRequest.berat) {
			response.berat = new Decimal(updateRequest.berat);
		}

		if (updateRequest.tinggi) {
			response.tinggi = new Decimal(updateRequest.tinggi);
		}

		if (updateRequest.lingkarKepala) {
			response.lingkarKepala = new Decimal(updateRequest.lingkarKepala);
		}

		if (updateRequest.keterangan) {
			response.keterangan = updateRequest.keterangan;
		}

		const result = await prismaClient.pemeriksaanBalita.update({
			where: {
				id: response.id,
			},
			data: response,
		});

		return toPemeriksaanBalitaResponse(result);
	}

	static async remove(id: number): Promise<string> {
		await this.checkPemeriksaanMustExist(id);
		await prismaClient.pemeriksaanBalita.delete({
			where: {
				id: id,
			},
		});

		return "Pemeriksaan berhasil dihapus";
	}
}
