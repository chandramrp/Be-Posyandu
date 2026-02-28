import { PemeriksaanIbuHamil } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
	CreatePemeriksaanIbuHamil,
	PemeriksaanIbuHamilResponse,
	toPemeriksaanIbuHamilResponse,
	UpdatePemeriksaanIbuHamil,
} from "../models/pemeriksaan-ibu-hamil-model";
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

	static async getAll(id: number): Promise<PemeriksaanIbuHamilResponse[]> {
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
