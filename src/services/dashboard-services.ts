import { prismaClient } from "../app/database";

export type DashboardStatsResponse = {
	totalBalita: number;
	totalIbuHamil: number;
	pemeriksaanBulanIni: number;
	perubahanBalita: number;
	perubahanIbuHamil: number;
	perubahanPemeriksaan: number;
};

export type DashboardChartResponse = {
	bulan: string;
	beratRata: number;
	tinggiRata: number;
};

export type DashboardRecentExamResponse = {
	id: number;
	tipe: "Balita" | "Ibu Hamil";
	nama: string;
	tanggal: Date;
	berat: string;
	tinggi: string;
	keterangan: string | null;
};

const NAMA_BULAN = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"Mei",
	"Jun",
	"Jul",
	"Agu",
	"Sep",
	"Okt",
	"Nov",
	"Des",
];

export class DashboardService {
	static async getStats(): Promise<DashboardStatsResponse> {
		const now = new Date();
		const bulanIni = new Date(now.getFullYear(), now.getMonth(), 1);
		const bulanLalu = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		const bulanDepan = new Date(now.getFullYear(), now.getMonth() + 1, 1);

		const [
			totalBalita,
			totalIbuHamil,
			pemeriksaanBalitaBulanIni,
			pemeriksaanIbuHamilBulanIni,
			balitaBulanLalu,
			ibuHamilBulanLalu,
			pemeriksaanBalitaBulanLalu,
			pemeriksaanIbuHamilBulanLalu,
		] = await Promise.all([
			prismaClient.balita.count(),
			prismaClient.ibuHamil.count(),
			prismaClient.pemeriksaanBalita.count({
				where: { tanggal: { gte: bulanIni, lt: bulanDepan } },
			}),
			prismaClient.pemeriksaanIbuHamil.count({
				where: { tanggal: { gte: bulanIni, lt: bulanDepan } },
			}),
			prismaClient.balita.count({
				where: { createdAt: { gte: bulanLalu, lt: bulanIni } },
			}),
			prismaClient.ibuHamil.count({
				where: { createdAt: { gte: bulanLalu, lt: bulanIni } },
			}),
			prismaClient.pemeriksaanBalita.count({
				where: { tanggal: { gte: bulanLalu, lt: bulanIni } },
			}),
			prismaClient.pemeriksaanIbuHamil.count({
				where: { tanggal: { gte: bulanLalu, lt: bulanIni } },
			}),
		]);

		const pemeriksaanBulanIni =
			pemeriksaanBalitaBulanIni + pemeriksaanIbuHamilBulanIni;
		const pemeriksaanBulanLalu =
			pemeriksaanBalitaBulanLalu + pemeriksaanIbuHamilBulanLalu;

		return {
			totalBalita,
			totalIbuHamil,
			pemeriksaanBulanIni,
			perubahanBalita: totalBalita - balitaBulanLalu,
			perubahanIbuHamil: totalIbuHamil - ibuHamilBulanLalu,
			perubahanPemeriksaan: pemeriksaanBulanIni - pemeriksaanBulanLalu,
		};
	}

	static async getChart(tahun?: number): Promise<DashboardChartResponse[]> {
		const targetTahun = tahun ?? new Date().getFullYear();
		const hasil: DashboardChartResponse[] = [];

		for (let bulan = 0; bulan < 8; bulan++) {
			const start = new Date(targetTahun, bulan, 1);
			const end = new Date(targetTahun, bulan + 1, 1);

			const data = await prismaClient.pemeriksaanBalita.findMany({
				where: {
					tanggal: { gte: start, lt: end },
				},
				select: {
					berat: true,
					tinggi: true,
				},
			});

			if (data.length === 0) {
				hasil.push({
					bulan: NAMA_BULAN[bulan],
					beratRata: 0,
					tinggiRata: 0,
				});
				continue;
			}

			const totalBerat = data.reduce(
				(acc, d) => acc + Number(d.berat),
				0,
			);
			const totalTinggi = data.reduce(
				(acc, d) => acc + Number(d.tinggi),
				0,
			);

			hasil.push({
				bulan: NAMA_BULAN[bulan],
				beratRata: Math.round((totalBerat / data.length) * 10) / 10,
				tinggiRata: Math.round((totalTinggi / data.length) * 10) / 10,
			});
		}

		return hasil;
	}

	static async getRecentExams(
		limit: number = 10,
	): Promise<DashboardRecentExamResponse[]> {
		const [balita, ibuHamil] = await Promise.all([
			prismaClient.pemeriksaanBalita.findMany({
				take: limit,
				orderBy: { tanggal: "desc" },
				include: {
					balita: { select: { nama: true } },
				},
			}),
			prismaClient.pemeriksaanIbuHamil.findMany({
				take: limit,
				orderBy: { tanggal: "desc" },
				include: {
					ibuHamil: { select: { nama: true } },
				},
			}),
		]);

		const merged = [
			...balita.map((item) => ({
				id: item.id,
				tipe: "Balita" as const,
				nama: item.balita.nama,
				tanggal: item.tanggal,
				berat: `${Number(item.berat)} kg`,
				tinggi: `${Number(item.tinggi)} cm`,
				keterangan: item.keterangan,
			})),
			...ibuHamil.map((item) => ({
				id: item.id,
				tipe: "Ibu Hamil" as const,
				nama: item.ibuHamil.nama,
				tanggal: item.tanggal,
				berat: `${Number(item.berat)} kg`,
				tinggi: `${Number(item.tinggi)} cm`,
				keterangan: item.keterangan,
			})),
		];

		return merged
			.sort((a, b) => b.tanggal.getTime() - a.tanggal.getTime())
			.slice(0, limit);
	}
}
