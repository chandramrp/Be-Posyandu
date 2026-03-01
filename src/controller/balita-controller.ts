import { JenisKelamin } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { logger } from "../app/logging";
import {
	CreateBalitaRequest,
	UpdateBalitaRequest,
} from "../models/balita-model";
import { BalitaService } from "../services/balita-services";
import { BalitaRequest } from "../type/balita-request";

export class BalitaController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateBalitaRequest =
				req.body as CreateBalitaRequest;
			const response = await BalitaService.register(request);

			logger.debug("response : " + JSON.stringify(response));
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async getAll(req: BalitaRequest, res: Response, next: NextFunction) {
		try {
			const request = {
				search: req.query.search as string | undefined,
				jenisKelamin: req.query.jenisKelamin as
					| JenisKelamin
					| undefined,
				page: Number(req.query.page as string) || 1,
				limit: Number(req.query.limit as string) || 10,
			};

			const response = await BalitaService.getAll(request);
			logger.debug("response : " + JSON.stringify(response));
			res.status(200).json(response);
		} catch (e) {
			next(e);
		}
	}

	static async get(req: BalitaRequest, res: Response, next: NextFunction) {
		try {
			const balitaId = Number(req.params.id!);
			const response = await BalitaService.get(balitaId);

			logger.debug("response : " + JSON.stringify(response));
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async update(req: BalitaRequest, res: Response, next: NextFunction) {
		try {
			const balitaId = Number(req.params.id);
			const request: UpdateBalitaRequest =
				req.body as UpdateBalitaRequest;
			const response = await BalitaService.update(balitaId, request);

			logger.debug("response : " + JSON.stringify(response));
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async remove(req: BalitaRequest, res: Response, next: NextFunction) {
		try {
			const balitaId = Number(req.params.id);
			await BalitaService.remove(balitaId);

			res.status(200).json({
				data: "Berhasil dihapus",
			});
		} catch (e) {
			next(e);
		}
	}
}
