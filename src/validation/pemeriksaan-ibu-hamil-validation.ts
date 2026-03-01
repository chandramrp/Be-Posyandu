import z, { ZodType } from "zod";

export class PemeriksaanIbuHamilValidation {
	static readonly CREATE: ZodType = z.object({
		ibuHamilId: z.number().positive(),
		tanggal: z.coerce.date(),
		usiaKehamilan: z.number().positive(),
		berat: z.number().positive(),
		tinggi: z.number().positive(),
		tensi: z.string().min(1).max(10),
		keterangan: z.string().min(1).max(100).optional(),
	});

	static readonly UPDATE: ZodType = z.object({
		tanggal: z.coerce.date().optional(),
		usiaKehamilan: z.number().positive().optional(),
		berat: z.number().positive().optional(),
		tinggi: z.number().positive().optional(),
		tensi: z.string().min(1).max(10).optional(),
		keterangan: z.string().min(1).max(100).optional(),
	});

	static readonly QUERY: ZodType = z.object({
		search: z.string().optional(),
		page: z.coerce.number().min(1).default(1),
		limit: z.coerce.number().min(1).max(100).default(10),
	});
}
