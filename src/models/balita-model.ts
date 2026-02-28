import { Balita, JenisKelamin } from "@prisma/client";

export type BalitaResponse = {
	id: number;
	nama: string;
	tanggalLahir: Date;
	jenisKelamin: string;
	namaOrtu: string;
	alamat: string;
	posyandu: string;
};

export type CreateBalitaRequest = {
	nama: string;
	tanggalLahir: Date;
	jenisKelamin: JenisKelamin;
	namaOrtu: string;
	alamat: string;
};

export type UpdateBalitaRequest = {
	nama?: string | null;
	tanggalLahir?: Date | null;
	jenisKelamin?: JenisKelamin | null;
	namaOrtu?: string | null;
	alamat?: string | null;
};

export type BalitaQuery = {
	search?: string;
	jenisKelamin?: JenisKelamin;
	page: number;
	limit: number;
};

export function toBalitaResponse(balita: Balita): BalitaResponse {
	return {
		id: balita.id,
		nama: balita.nama,
		tanggalLahir: balita.tanggalLahir,
		jenisKelamin: balita.jenisKelamin,
		namaOrtu: balita.namaOrtu,
		alamat: balita.alamat,
		posyandu: balita.posyandu,
	};
}
