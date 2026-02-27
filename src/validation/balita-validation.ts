import z, { ZodType } from "zod";

export class BalitaValidation {
	static readonly REGISTER: ZodType = z.object({
		nama: z.string().min(1).max(100),
		tanggalLahir: z.coerce.date(),
		jenisKelamin: z.string(),
		namaOrtu: z.string().min(1).max(100),
		alamat: z.string().min(1).max(100),
	});

	static readonly UPDATE: ZodType = z.object({
		nama: z.string().min(1).max(100).optional(),
		tanggalLahir: z.coerce.date().optional(),
		jenisKelamin: z.string().optional(),
		namaOrtu: z.string().min(1).max(100).optional(),
		alamat: z.string().min(1).max(100).optional(),
	});
}
