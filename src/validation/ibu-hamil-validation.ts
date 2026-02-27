import z from "zod";

export class IbuHamilValidation {
	static readonly REGISTER = z.object({
		nama: z.string().min(1).max(100),
		namaSuami: z.string().min(1).max(100),
		tanggalLahir: z.coerce.date(),
		alamat: z.string().min(1).max(100),
		usiaKehamilan: z.number().positive(),
		golDarah: z.string().min(1).max(4),
		posyandu: z.string().min(1).max(100),
	});

	static readonly UPDATE = z.object({
		nama: z.string().min(1).max(100).optional(),
		namaSuami: z.string().min(1).max(100).optional(),
		tanggalLahir: z.coerce.date().optional(),
		alamat: z.string().min(1).max(100).optional(),
		usiaKehamilan: z.number().positive().optional(),
		golDarah: z.string().min(1).max(4).optional(),
		posyandu: z.string().min(1).max(100).optional(),
	});
}
