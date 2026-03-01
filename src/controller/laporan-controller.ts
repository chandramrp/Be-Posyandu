import { NextFunction, Request, Response } from "express";
import { LaporanQuery } from "../models/laporan-model";
import { LaporanService } from "../services/laporan-services";

export class LaporanController {
	static async balita(req: Request, res: Response, next: NextFunction) {
		try {
			const query: LaporanQuery = {
				bulan: Number(req.query.bulan as string),
				tahun: Number(req.query.tahun as string),
				page: Number(req.query.page as string) || 1,
				limit: Number(req.query.limit as string) || 10,
			};

			const response = await LaporanService.laporanBalita(query);
			res.status(200).json(response);
		} catch (e) {
			next(e);
		}
	}

	static async ibuHamil(req: Request, res: Response, next: NextFunction) {
		try {
			const query: LaporanQuery = {
				bulan: Number(req.query.bulan as string),
				tahun: Number(req.query.tahun as string),
				page: Number(req.query.page as string) || 1,
				limit: Number(req.query.limit as string) || 10,
			};

			const response = await LaporanService.laporanIbuHamil(query);
			res.status(200).json(response);
		} catch (e) {
			next(e);
		}
	}

	static async exportBalita(req: Request, res: Response, next: NextFunction) {
		try {
			const bulan = Number(req.query.bulan as string);
			const tahun = Number(req.query.tahun as string);

			const data = await LaporanService.exportBalita(bulan, tahun);
			res.status(200).json({ data });
		} catch (e) {
			next(e);
		}
	}

	static async exportIbuHamil(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const bulan = Number(req.query.bulan as string);
			const tahun = Number(req.query.tahun as string);

			const data = await LaporanService.exportIbuHamil(bulan, tahun);
			res.status(200).json({ data });
		} catch (e) {
			next(e);
		}
	}
}
