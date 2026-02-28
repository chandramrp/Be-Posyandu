import { NextFunction, Request, Response } from "express";
import { UpdatePemeriksaanIbuHamil } from "../models/pemeriksaan-ibu-hamil-model";
import { IbuHamilServices } from "../services/ibu-hamil-services";
import { PemeriksaanIbuHamilService } from "../services/pemeriksaan-ibu-hamil-services";

export class PemeriksaanIbuHamilController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const ibuHamilId = Number(req.params.ibuHamilId);
			await IbuHamilServices.checkIbuHamilMustExist(ibuHamilId);
			const request = {
				ibuHamilId: ibuHamilId,
				...req.body,
			};
			const response = await PemeriksaanIbuHamilService.create(request);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async get(req: Request, res: Response, next: NextFunction) {
		try {
			const ibuHamilId = Number(req.params.ibuHamilId);
			const pemeriksaanId = Number(req.params.pemeriksaanId);
			await IbuHamilServices.checkIbuHamilMustExist(ibuHamilId);
			const response =
				await PemeriksaanIbuHamilService.get(pemeriksaanId);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const ibuHamilId = Number(req.params.ibuHamilId);
			await IbuHamilServices.checkIbuHamilMustExist(ibuHamilId);
			const response =
				await PemeriksaanIbuHamilService.getAll(ibuHamilId);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const updateRequest: UpdatePemeriksaanIbuHamil =
				req.body as UpdatePemeriksaanIbuHamil;

			const ibuHamilId = Number(req.params.ibuHamilId);
			const pemeriksaanId = Number(req.params.pemeriksaanId);
			await IbuHamilServices.checkIbuHamilMustExist(ibuHamilId);

			const response = await PemeriksaanIbuHamilService.update(
				pemeriksaanId,
				updateRequest,
			);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const ibuHamilId = Number(req.params.ibuHamilId);
			const pemeriksaanId = Number(req.params.pemeriksaanId);
			await IbuHamilServices.checkIbuHamilMustExist(ibuHamilId);
			const response =
				await PemeriksaanIbuHamilService.remove(pemeriksaanId);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}
}
