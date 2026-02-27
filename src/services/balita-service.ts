import { Balita } from "@prisma/client";
import { prismaClient } from "../app/database";
import {
	BalitaResponse,
	CreateBalitaRequest,
	toBalitaResponse,
	UpdateBalitaRequest,
} from "../models/balita-model";
import { BalitaValidation } from "../validation/balita-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";
import { logger } from "../app/logging";

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

	static async getAll(): Promise<BalitaResponse[]> {
		const listBalita = await prismaClient.balita.findMany();

		logger.debug(listBalita);
		if (listBalita.length === 0) {
			throw new ResponseError(404, "Balita not found");
		}

		return listBalita.map((balita) => toBalitaResponse(balita));
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

		return toBalitaResponse(balita);
	}
}
