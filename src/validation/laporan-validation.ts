import z, { ZodType } from "zod";

export class LaporanValidation {
	static readonly QUERY: ZodType = z.object({
		bulan: z.coerce.number().min(1).max(12).positive(),
		tahun: z.coerce.number().min(1).positive(),
		page: z.coerce.number().min(1).default(1),
		limit: z.coerce.number().min(1).max(100).default(10),
	});
}
