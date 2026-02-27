import { NextFunction, Request, Response } from "express";
import { logger } from "../app/logging";
import {
	CreateIbuHamilRequest,
	UpdateIbuHamilRequest,
} from "../models/ibu-hamil-model";
import { IbuHamilServices } from "../services/ibu-hamil-services";

export class IbuHamilController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateIbuHamilRequest =
				req.body! as CreateIbuHamilRequest;
			const response = await IbuHamilServices.register(request);

			logger.debug("response : " + JSON.stringify(response));
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async getAll(_: Request, res: Response, next: NextFunction) {
		try {
			const response = await IbuHamilServices.getAll();
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async get(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const response = await IbuHamilServices.get(id);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const request: UpdateIbuHamilRequest =
				req.body as UpdateIbuHamilRequest;
			const response = await IbuHamilServices.update(id, request);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}

	static async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const response = await IbuHamilServices.remove(id);
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}
}
