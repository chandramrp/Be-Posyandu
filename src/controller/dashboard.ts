import { NextFunction, Request, Response } from "express";
import { DashboardService } from "../services/dashboard-services";

export class DashboardController {
	static async stats(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await DashboardService.getStats();
			res.status(200).json({ data: response });
		} catch (e) {
			next(e);
		}
	}

	static async chart(req: Request, res: Response, next: NextFunction) {
		try {
			const tahun = req.query.tahun
				? Number(req.query.tahun as string)
				: undefined;

			const response = await DashboardService.getChart(tahun);
			res.status(200).json({ data: response });
		} catch (e) {
			next(e);
		}
	}

	static async recentExams(req: Request, res: Response, next: NextFunction) {
		try {
			const limit = Number(req.query.limit as string) || 10;
			const response = await DashboardService.getRecentExams(limit);
			res.status(200).json({ data: response });
		} catch (e) {
			next(e);
		}
	}
}
