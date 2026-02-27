import { IbuHamil } from "@prisma/client";

export type IbuHamilResponse = {
	id: number;
	nama: string;
	namaSuami: string;
	tanggalLahir: Date;
	alamat: string;
	golDarah: string;
	posyandu: string;
	usiaKehamilan: number;
};

export type CreateIbuHamilRequest = {
	nama: string;
	namaSuami: string;
	tanggalLahir: Date;
	alamat: string;
	golDarah: string;
	posyandu: string;
	usiaKehamilan: number;
};

export type UpdateIbuHamilRequest = {
	nama: string;
	namaSuami: string;
	tanggalLahir: Date;
	alamat: string;
	golDarah: string;
	posyandu: string;
	usiaKehamilan: number;
};

export function toIbuHamilResponse(ibuHamil: IbuHamil): IbuHamilResponse {
	return {
		id: ibuHamil.id,
		nama: ibuHamil.nama,
		namaSuami: ibuHamil.namaSuami,
		tanggalLahir: ibuHamil.tanggalLahir,
		alamat: ibuHamil.alamat,
		golDarah: ibuHamil.golDarah,
		posyandu: ibuHamil.posyandu,
		usiaKehamilan: ibuHamil.usiaKehamilan,
	};
}
