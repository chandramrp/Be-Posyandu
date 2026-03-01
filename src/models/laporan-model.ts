export type LaporanBalitaResponse = {
	id: number;
	namaBalita: string;
	tanggalPemeriksaan: Date;
	umur: string;
	berat: number;
	tinggi: number;
	lingkarKepala: number;
	keterangan: string | null;
};

export type LaporanIbuHamilResponse = {
	id: number;
	namaIbuHamil: string;
	tanggalPemeriksaan: Date;
	usiaKehamilan: number;
	berat: number;
	tinggi: number;
	tensi: string;
	keterangan: string | null;
};

export type LaporanQuery = {
	bulan: number;
	tahun: number;
	page: number;
	limit: number;
};
