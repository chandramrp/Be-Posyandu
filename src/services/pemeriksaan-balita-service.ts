import { PemeriksaanBalita } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
	CreatePemeriksaanBalitaRequest,
	PemeriksaanBalitaResponse,
	toPemeriksaanBalitaResponse,
} from "../models/pemeriksaan-balita-model";
import { PemeriksaanBalitaValidation } from "../validation/pemeriksaan-balita-validation";
import { Validation } from "../validation/validation";

export class PemeriksaanBalitaService {
	static async create(
		request: CreatePemeriksaanBalitaRequest,
	): Promise<PemeriksaanBalitaResponse> {
		const pemeriksaanBalitaRequest = Validation.validate(
			PemeriksaanBalitaValidation.CREATE,
			request,
		);

		const result = await prismaClient.pemeriksaanBalita.create({
			data: {
				balitaId: pemeriksaanBalitaRequest.balitaId,
				tanggal: pemeriksaanBalitaRequest.tanggal,
				berat: pemeriksaanBalitaRequest.berat,
				tinggi: pemeriksaanBalitaRequest.tinggi,
				lingkarKepala: pemeriksaanBalitaRequest.lingkarKepala,
				keterangan: pemeriksaanBalitaRequest.keterangan,
			},
		});

		return toPemeriksaanBalitaResponse(result);
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

	static async get(id: number): Promise<PemeriksaanBalitaResponse> {
		const response = await this.checkPemeriksaanMustExist(id);
		return toPemeriksaanBalitaResponse(response);
	}
}
