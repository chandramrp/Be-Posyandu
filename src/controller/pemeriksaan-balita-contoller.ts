import { NextFunction, Request, Response } from "express";
import {
	CreatePemeriksaanBalitaRequest,
	UpdatePemeriksaanBalitaRequest,
} from "../models/pemeriksaan-balita-model";
import { BalitaService } from "../services/balita-services";
import { PemeriksaanBalitaService } from "../services/pemeriksaan-balita-service";

export class PemeriksaanBalitaController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			await BalitaService.checkBalitaMustExsist(id);
			const request: CreatePemeriksaanBalitaRequest = {
				...req.body,
				balitaId: id,
			};

			const response = await PemeriksaanBalitaService.create(request);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const request = {
				search: req.query.search as string | undefined,
				page: Number(req.query.page) || 1,
				limit: Number(req.query.limit) || 10,
			};

			const response = await PemeriksaanBalitaService.getAll(request);
			res.status(200).json(response);
		} catch (e) {
			next(e);
		}
	}

	static async getAllById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			await BalitaService.checkBalitaMustExsist(id);
			const response = await PemeriksaanBalitaService.getAllByid(id);

			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async get(req: Request, res: Response, next: NextFunction) {
		try {
			const balitaId = Number(req.params.balitaId);
			const pemeriksaanId = Number(req.params.pemeriksaanId);
			await BalitaService.checkBalitaMustExsist(balitaId);
			const response = await PemeriksaanBalitaService.get(pemeriksaanId);

			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const request: UpdatePemeriksaanBalitaRequest =
				req.body as UpdatePemeriksaanBalitaRequest;
			const balitaId = Number(req.params.balitaId);
			const pemeriksaanId = Number(req.params.pemeriksaanId);
			await BalitaService.checkBalitaMustExsist(balitaId);
			const response = await PemeriksaanBalitaService.update(
				pemeriksaanId,
				request,
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
			const balitaId = Number(req.params.balitaId);
			const pemeriksaanId = Number(req.params.pemeriksaanId);
			await BalitaService.checkBalitaMustExsist(balitaId);
			const response =
				await PemeriksaanBalitaService.remove(pemeriksaanId);

			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}
}
