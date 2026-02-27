import z, { ZodType } from "zod";

export class PemeriksaanBalitaValidation {
	static readonly CREATE: ZodType = z.object({
		balitaId: z.number().positive(),
		tanggal: z.coerce.date(),
		berat: z.number().positive(),
		tinggi: z.number().positive(),
		lingkarKepala: z.number().positive(),
		keterangan: z.string().min(1).max(100).optional(),
	});
}
