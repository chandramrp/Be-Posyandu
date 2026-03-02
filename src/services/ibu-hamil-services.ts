import { IbuHamil } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import {
	CreateIbuHamilRequest,
	IbuHamilQuery,
	IbuHamilResponse,
	toIbuHamilResponse,
	UpdateIbuHamilRequest,
} from "../models/ibu-hamil-model";
import { Paginated } from "../models/page";
import { IbuHamilValidation } from "../validation/ibu-hamil-validation";
import { Validation } from "../validation/validation";

export class IbuHamilServices {
	static async register(
		request: CreateIbuHamilRequest,
	): Promise<IbuHamilResponse> {
		const ibuHamilRequest = Validation.validate(
			IbuHamilValidation.REGISTER,
			request,
		);

		const response = await prismaClient.ibuHamil.create({
			data: ibuHamilRequest,
		});
		logger.debug("response : " + response);

		return toIbuHamilResponse(response);
	}

	static async getAll(
		query: IbuHamilQuery,
	): Promise<Paginated<IbuHamilResponse[]>> {
		const validQuery = Validation.validate(IbuHamilValidation.QUERY, query);
		const { search, page, limit } = validQuery;
		const skip = (page - 1) * limit;

		const where = {
			AND: [
				search
					? {
							OR: [
								{ nama: { contains: search } },
								{ namaSuami: { contains: search } },
							],
						}
					: {},
			],
		};

		const [data, total] = await Promise.all([
			prismaClient.ibuHamil.findMany({
				where,
				skip,
				take: limit,
				orderBy: {
					createdAt: "desc",
				},
			}),
			prismaClient.ibuHamil.count({ where }),
		]);

		return {
			data: data.map((ibuHamil) => toIbuHamilResponse(ibuHamil)),
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	static async checkIbuHamilMustExist(id: number): Promise<IbuHamil> {
		const result = await prismaClient.ibuHamil.findUnique({
			where: {
				id: id,
			},
		});

		if (!result) {
			throw new ResponseError(404, "Ibu hamil not found");
		}

		return result;
	}
	static async get(id: number): Promise<IbuHamilResponse> {
		const response = await this.checkIbuHamilMustExist(id);
		return response;
	}

	static async update(
		id: number,
		request: UpdateIbuHamilRequest,
	): Promise<IbuHamilResponse> {
		const updateRequest = Validation.validate(
			IbuHamilValidation.UPDATE,
			request,
		);
		const dataIbuhamil = await this.checkIbuHamilMustExist(id);

		if (updateRequest.nama) {
			dataIbuhamil.nama = updateRequest.nama;
		}

		if (updateRequest.namaSuami) {
			dataIbuhamil.namaSuami = updateRequest.namaSuami;
		}

		if (updateRequest.tanggalLahir) {
			dataIbuhamil.tanggalLahir = updateRequest.tanggalLahir;
		}

		if (updateRequest.alamat) {
			dataIbuhamil.alamat = updateRequest.alamat;
		}

		if (updateRequest.golDarah) {
			dataIbuhamil.golDarah = updateRequest.golDarah;
		}

		if (updateRequest.usiaKehamilan) {
			dataIbuhamil.usiaKehamilan = updateRequest.usiaKehamilan;
		}

		const result = await prismaClient.ibuHamil.update({
			where: {
				id: id,
			},
			data: dataIbuhamil,
		});

		return toIbuHamilResponse(result);
	}

	static async remove(id: number) {
		const ibuHamil = await this.checkIbuHamilMustExist(id);
		await prismaClient.ibuHamil.delete({
			where: {
				id: ibuHamil.id,
			},
		});
		return "Data ibu hamil berhasil dihapus";
	}
}
