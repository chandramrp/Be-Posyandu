import z, { ZodType } from "zod";

export class UserValidation {
	static readonly REGISTER: ZodType = z.object({
		nama: z.string().min(1).max(100),
		email: z.string().email().min(1).max(100),
		password: z.string().min(1).max(50),
		role: z.string(),
	});

	static readonly LOGIN: ZodType = z.object({
		email: z.string().email().min(1).max(100),
		password: z.string().min(1).max(50),
	});

	static readonly UPDATE: ZodType = z.object({
		nama: z.string().min(1).max(100).optional(),
		email: z.string().email().min(1).max(100).optional(),
		password: z.string().min(1).max(50).optional(),
		role: z.string().optional(),
		status: z.string().optional(),
	});

	static readonly QUERY: ZodType = z.object({
		search: z.string().optional(),
		page: z.coerce.number().min(1).default(1),
		limit: z.coerce.number().min(1).max(100).default(5),
	});
}
