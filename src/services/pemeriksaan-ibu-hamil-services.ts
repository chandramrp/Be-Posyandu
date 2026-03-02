import { PemeriksaanIbuHamil, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Paginated } from "../models/page";
import {
	CreatePemeriksaanIbuHamil,
	PemeriksaanIbuHamilQuery,
	PemeriksaanIbuHamilResponse,
	toPemeriksaanIbuHamilResponse,
	UpdatePemeriksaanIbuHamil,
} from "../models/pemeriksaan-ibu-hamil-model";
import { PemeriksaanBalitaValidation } from "../validation/pemeriksaan-balita-validation";
import { PemeriksaanIbuHamilValidation } from "../validation/pemeriksaan-ibu-hamil-validation";
import { Validation } from "../validation/validation";

export class PemeriksaanIbuHamilService {
	static async create(
		request: CreatePemeriksaanIbuHamil,
	): Promise<PemeriksaanIbuHamilResponse> {
		const createRequest = Validation.validate(
			PemeriksaanIbuHamilValidation.CREATE,
			request,
		);
		const response = await prismaClient.pemeriksaanIbuHamil.create({
			data: createRequest,
		});
		return toPemeriksaanIbuHamilResponse(response);
	}

	static async checkPemeriksaanMustExist(
		id: number,
	): Promise<PemeriksaanIbuHamil> {
		const result = await prismaClient.pemeriksaanIbuHamil.findUnique({
			where: {
				id: id,
			},
		});

		if (!result) {
			throw new ResponseError(404, "Pemeriksaan ibu hamil not found");
		}

		return result;
	}

	static async get(id: number): Promise<PemeriksaanIbuHamilResponse> {
		const response = await this.checkPemeriksaanMustExist(id);
		return toPemeriksaanIbuHamilResponse(response);
	}

	static async getAll(
		request: PemeriksaanIbuHamilQuery,
	): Promise<Paginated<PemeriksaanIbuHamilResponse[]>> {
		const validQuery = Validation.validate(
			PemeriksaanBalitaValidation.QUERY,
			request,
		);
		const { search, page, limit } = validQuery;
		const skip = (page - 1) * limit;

		const filters: Prisma.PemeriksaanIbuHamilWhereInput[] = [];
		if (search) {
			filters.push({
				OR: [{ ibuHamil: { nama: search } }],
			});
		}
		const where = {
			AND: filters,
		};

		const [data, total] = await Promise.all([
			prismaClient.pemeriksaanIbuHamil.findMany({
				where,
				skip,
				take: limit,
				orderBy: {
					createdAt: "desc",
				},
			}),
			prismaClient.pemeriksaanIbuHamil.count({ where }),
		]);

		return {
			data: data.map((pemeriksaan) =>
				toPemeriksaanIbuHamilResponse(pemeriksaan),
			),
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
	}
	static async getAllById(
		id: number,
	): Promise<PemeriksaanIbuHamilResponse[]> {
		const response = await prismaClient.pemeriksaanIbuHamil.findMany({
			where: {
				ibuHamilId: id,
			},
		});
		if (response.length === 0) {
			throw new ResponseError(404, "Pemeriksaan ibu hamil not found");
		}
		return response.map((data) => toPemeriksaanIbuHamilResponse(data));
	}

	static async update(
		id: number,
		request: UpdatePemeriksaanIbuHamil,
	): Promise<PemeriksaanIbuHamilResponse> {
		const updateRequest = Validation.validate(
			PemeriksaanIbuHamilValidation.UPDATE,
			request,
		);
		const pemeriksaan = await this.checkPemeriksaanMustExist(id);

		if (updateRequest.tanggal) {
			pemeriksaan.tanggal = updateRequest.tanggal;
		}

		if (updateRequest.usiaKehamilan) {
			pemeriksaan.usiaKehamilan = updateRequest.usiaKehamilan;
		}

		if (updateRequest.berat) {
			pemeriksaan.berat = new Decimal(updateRequest.berat);
		}

		if (updateRequest.tinggi) {
			pemeriksaan.tinggi = new Decimal(updateRequest.tinggi);
		}

		if (updateRequest.tensi) {
			pemeriksaan.tensi = updateRequest.tensi;
		}

		if (updateRequest.keterangan) {
			pemeriksaan.keterangan = updateRequest.keterangan;
		}

		const response = await prismaClient.pemeriksaanIbuHamil.update({
			where: {
				id: id,
			},
			data: pemeriksaan,
		});

		return toPemeriksaanIbuHamilResponse(response);
	}

	static async remove(id: number): Promise<string> {
		await this.checkPemeriksaanMustExist(id);
		await prismaClient.pemeriksaanIbuHamil.delete({
			where: {
				id: id,
			},
		});

		return "Pemeriksaan berhasil dihapus";
	}
}
