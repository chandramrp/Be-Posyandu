import { PemeriksaanBalita } from "@prisma/client";

export type PemeriksaanBalitaResponse = {
	id: number;
	balitaId: number;
	tanggal: Date;
	berat: number;
	tinggi: number;
	lingkarKepala: number;
	keterangan: string | null;
};

export type CreatePemeriksaanBalitaRequest = {
	balitaId: number;
	tanggal: Date;
	berat: number;
	tinggi: number;
	lingkarKepala: number;
	keterangan?: string;
};

export type UpdatePemeriksaanBalitaRequest = {
	tanggal?: Date;
	berat?: number;
	tinggi?: number;
	lingkarKepala?: number;
	keterangan?: string;
};

export function toPemeriksaanBalitaResponse(
	pemeriksaan: PemeriksaanBalita,
): PemeriksaanBalitaResponse {
	return {
		id: pemeriksaan.id,
		balitaId: pemeriksaan.balitaId,
		tanggal: pemeriksaan.tanggal,
		berat: Number(pemeriksaan.berat),
		tinggi: Number(pemeriksaan.tinggi),
		lingkarKepala: Number(pemeriksaan.lingkarKepala),
		keterangan: pemeriksaan.keterangan,
	};
}
