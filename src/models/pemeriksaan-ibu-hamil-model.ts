import { PemeriksaanIbuHamil } from "@prisma/client";

export type PemeriksaanIbuHamilResponse = {
	id: number;
	ibuHamilId: number;
	tanggal: Date;
	usiaKehamilan: number;
	berat: number;
	tinggi: number;
	tensi: string;
	keterangan?: string | null;
};

export type CreatePemeriksaanIbuHamil = {
	ibuHamilId: number;
	tanggal: Date;
	usiaKehamilan: number;
	berat: number;
	tinggi: number;
	tensi: string;
	keterangan?: string;
};

export type UpdatePemeriksaanIbuHamil = {
	tanggal?: Date;
	usiaKehamilan?: number;
	berat?: number;
	tinggi?: number;
	tensi?: string;
	keterangan?: string;
};

export function toPemeriksaanIbuHamilResponse(
	pemeriksaan: PemeriksaanIbuHamil,
): PemeriksaanIbuHamilResponse {
	return {
		id: pemeriksaan.id,
		ibuHamilId: pemeriksaan.ibuHamilId,
		tanggal: pemeriksaan.tanggal,
		usiaKehamilan: pemeriksaan.usiaKehamilan,
		berat: Number(pemeriksaan.berat),
		tinggi: Number(pemeriksaan.tinggi),
		tensi: pemeriksaan.tensi,
		keterangan: pemeriksaan.keterangan,
	};
}
