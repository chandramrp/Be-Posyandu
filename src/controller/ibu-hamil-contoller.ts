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

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const query = {
				search: req.query.search as string | undefined,
				page: Number(req.query.page) || 1,
				limit: Number(req.query.limit) || 10,
			};
			const response = await IbuHamilServices.getAll(query);
			logger.debug("response : " + JSON.stringify(response));
			res.status(200).json(response);
		} catch (e) {
			next(e);
		}
	}

	static async get(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const response = await IbuHamilServices.get(id);
			logger.debug("response : " + JSON.stringify(response));
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
			logger.debug("response : " + JSON.stringify(response));
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
			logger.debug("response : " + JSON.stringify(response));
			res.status(200).json({
				data: response,
			});
		} catch (e) {
			next(e);
		}
	}
}
