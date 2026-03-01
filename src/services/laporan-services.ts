import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";

export type LaporanQuery = {
	bulan: number;
	tahun: number;
	page: number;
	limit: number;
};

export type LaporanBalitaResponse = {
	id: number;
	namaBalita: string;
	tanggalPemeriksaan: Date;
	umur: string;
	beratBadan: number;
	tinggiBadan: number;
	lingkarKepala: number;
	keterangan: string | null;
};

export type LaporanIbuHamilResponse = {
	id: number;
	namaIbuHamil: string;
	tanggalPemeriksaan: Date;
	usiaKehamilan: number;
	beratBadan: number;
	tinggiBadan: number;
	tensi: string;
	keterangan: string | null;
};

export type LaporanPaginated<T> = {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

const hitungUmur = (tanggalLahir: Date, tanggalPemeriksaan: Date): string => {
	const bulan =
		(tanggalPemeriksaan.getFullYear() - tanggalLahir.getFullYear()) * 12 +
		(tanggalPemeriksaan.getMonth() - tanggalLahir.getMonth());
	return `${bulan} bulan`;
};

export class LaporanService {
	static async laporanBalita(
		query: LaporanQuery,
	): Promise<LaporanPaginated<LaporanBalitaResponse[]>> {
		const { bulan, tahun, page, limit } = query;

		if (!bulan || !tahun) {
			throw new ResponseError(400, "Bulan dan tahun wajib diisi");
		}

		const skip = (page - 1) * limit;

		const where = {
			tanggal: {
				gte: new Date(tahun, bulan - 1, 1),
				lt: new Date(tahun, bulan, 1),
			},
		};

		const [data, total] = await Promise.all([
			prismaClient.pemeriksaanBalita.findMany({
				where,
				skip,
				take: limit,
				orderBy: { tanggal: "desc" },
				include: {
					balita: {
						select: {
							nama: true,
							tanggalLahir: true,
						},
					},
				},
			}),
			prismaClient.pemeriksaanBalita.count({ where }),
		]);

		return {
			data: data.map((item) => ({
				id: item.id,
				namaBalita: item.balita.nama,
				tanggalPemeriksaan: item.tanggal,
				umur: hitungUmur(item.balita.tanggalLahir, item.tanggal),
				beratBadan: Number(item.berat),
				tinggiBadan: Number(item.tinggi),
				lingkarKepala: Number(item.lingkarKepala),
				keterangan: item.keterangan,
			})),
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	static async laporanIbuHamil(
		query: LaporanQuery,
	): Promise<LaporanPaginated<LaporanIbuHamilResponse[]>> {
		const { bulan, tahun, page, limit } = query;

		if (!bulan || !tahun) {
			throw new ResponseError(400, "Bulan dan tahun wajib diisi");
		}

		const skip = (page - 1) * limit;

		const where = {
			tanggal: {
				gte: new Date(tahun, bulan - 1, 1),
				lt: new Date(tahun, bulan, 1),
			},
		};

		const [data, total] = await Promise.all([
			prismaClient.pemeriksaanIbuHamil.findMany({
				where,
				skip,
				take: limit,
				orderBy: { tanggal: "desc" },
				include: {
					ibuHamil: {
						select: {
							nama: true,
						},
					},
				},
			}),
			prismaClient.pemeriksaanIbuHamil.count({ where }),
		]);

		return {
			data: data.map((item) => ({
				id: item.id,
				namaIbuHamil: item.ibuHamil.nama,
				tanggalPemeriksaan: item.tanggal,
				usiaKehamilan: item.usiaKehamilan,
				beratBadan: Number(item.berat),
				tinggiBadan: Number(item.tinggi),
				tensi: item.tensi,
				keterangan: item.keterangan,
			})),
			meta: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		};
	}

	static async exportBalita(
		bulan: number,
		tahun: number,
	): Promise<LaporanBalitaResponse[]> {
		if (!bulan || !tahun) {
			throw new ResponseError(400, "Bulan dan tahun wajib diisi");
		}

		const where = {
			tanggal: {
				gte: new Date(tahun, bulan - 1, 1),
				lt: new Date(tahun, bulan, 1),
			},
		};

		const data = await prismaClient.pemeriksaanBalita.findMany({
			where,
			orderBy: { tanggal: "desc" },
			include: {
				balita: {
					select: {
						nama: true,
						tanggalLahir: true,
					},
				},
			},
		});

		return data.map((item) => ({
			id: item.id,
			namaBalita: item.balita.nama,
			tanggalPemeriksaan: item.tanggal,
			umur: hitungUmur(item.balita.tanggalLahir, item.tanggal),
			beratBadan: Number(item.berat),
			tinggiBadan: Number(item.tinggi),
			lingkarKepala: Number(item.lingkarKepala),
			keterangan: item.keterangan,
		}));
	}

	static async exportIbuHamil(
		bulan: number,
		tahun: number,
	): Promise<LaporanIbuHamilResponse[]> {
		if (!bulan || !tahun) {
			throw new ResponseError(400, "Bulan dan tahun wajib diisi");
		}

		const where = {
			tanggal: {
				gte: new Date(tahun, bulan - 1, 1),
				lt: new Date(tahun, bulan, 1),
			},
		};

		const data = await prismaClient.pemeriksaanIbuHamil.findMany({
			where,
			orderBy: { tanggal: "desc" },
			include: {
				ibuHamil: {
					select: {
						nama: true,
					},
				},
			},
		});

		return data.map((item) => ({
			id: item.id,
			namaIbuHamil: item.ibuHamil.nama,
			tanggalPemeriksaan: item.tanggal,
			usiaKehamilan: item.usiaKehamilan,
			beratBadan: Number(item.berat),
			tinggiBadan: Number(item.tinggi),
			tensi: item.tensi,
			keterangan: item.keterangan,
		}));
	}
}
