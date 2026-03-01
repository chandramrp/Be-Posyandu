import { PrismaClient, JenisKelamin } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Seeding database...");

	// ============================================================
	// USERS
	// ============================================================

	const hashedPassword = await bcrypt.hash("admin123", 10);

	await prisma.user.upsert({
		where: { email: "admin@posyandu.id" },
		update: {},
		create: {
			nama: "Admin Posyandu",
			email: "admin@posyandu.id",
			password: hashedPassword,
			role: "Admin",
			status: "Aktif",
		},
	});

	await prisma.user.upsert({
		where: { email: "kader@posyandu.id" },
		update: {},
		create: {
			nama: "Kader Posyandu",
			email: "kader@posyandu.id",
			password: await bcrypt.hash("kader123", 10),
			role: "Kader",
			status: "Aktif",
		},
	});

	console.log("✅ Users selesai");

	// ============================================================
	// BALITA
	// ============================================================

	const balitaData = [
		{
			nama: "Aisyah Putri Rahayu",
			tanggalLahir: new Date("2024-01-15"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Siti Rahayu",
			alamat: "Jl. Melati No. 1 RT 01/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Muhammad Rizki Pratama",
			tanggalLahir: new Date("2023-11-20"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Budi Pratama",
			alamat: "Jl. Melati No. 3 RT 01/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Nazwa Aulia Putri",
			tanggalLahir: new Date("2024-03-05"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Dewi Anggraini",
			alamat: "Jl. Kenanga No. 5 RT 02/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Arya Dimas Santoso",
			tanggalLahir: new Date("2023-08-12"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Hendra Santoso",
			alamat: "Jl. Kenanga No. 7 RT 02/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Nayla Sari Putri",
			tanggalLahir: new Date("2024-05-22"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Yuni Sari",
			alamat: "Jl. Mawar No. 2 RT 03/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Farhan Adhitya",
			tanggalLahir: new Date("2023-06-18"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Agus Adhitya",
			alamat: "Jl. Mawar No. 4 RT 03/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Salsabila Nurhaliza",
			tanggalLahir: new Date("2024-02-28"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Rina Nurhaliza",
			alamat: "Jl. Anggrek No. 6 RT 04/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Daffa Ramadhan",
			tanggalLahir: new Date("2023-09-14"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Rahmat Hidayat",
			alamat: "Jl. Anggrek No. 8 RT 04/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Kirana Aulia",
			tanggalLahir: new Date("2024-07-01"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Fatimah Azzahra",
			alamat: "Jl. Dahlia No. 10 RT 05/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Rafa Ardiansyah",
			tanggalLahir: new Date("2023-04-25"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Doni Ardiansyah",
			alamat: "Jl. Dahlia No. 12 RT 05/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Zahra Permata Sari",
			tanggalLahir: new Date("2024-04-10"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Lestari Permata",
			alamat: "Jl. Tulip No. 14 RT 06/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Raihan Maulana",
			tanggalLahir: new Date("2023-12-30"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Eko Maulana",
			alamat: "Jl. Tulip No. 16 RT 06/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Annisa Fitria",
			tanggalLahir: new Date("2024-06-15"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Sri Fitria",
			alamat: "Jl. Cempaka No. 18 RT 07/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Gibran Putra",
			tanggalLahir: new Date("2023-07-08"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Wawan Setiawan",
			alamat: "Jl. Cempaka No. 20 RT 07/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Putri Cahaya",
			tanggalLahir: new Date("2024-08-20"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Nurul Cahaya",
			alamat: "Jl. Melur No. 22 RT 08/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Hafiz Abdillah",
			tanggalLahir: new Date("2023-10-05"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Zainudin Abdillah",
			alamat: "Jl. Melur No. 24 RT 08/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Syifa Nur Aisyah",
			tanggalLahir: new Date("2024-01-30"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Marlina Aisyah",
			alamat: "Jl. Seroja No. 26 RT 09/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Farel Arif Kurniawan",
			tanggalLahir: new Date("2023-05-17"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Irfan Kurniawan",
			alamat: "Jl. Seroja No. 28 RT 09/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Adelia Maharani",
			tanggalLahir: new Date("2024-09-12"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Citra Maharani",
			alamat: "Jl. Flamboyan No. 30 RT 10/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Rafka Aditya",
			tanggalLahir: new Date("2023-03-22"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Yusuf Aditya",
			alamat: "Jl. Flamboyan No. 32 RT 10/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Keisya Nabila",
			tanggalLahir: new Date("2024-10-08"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Indah Nabila",
			alamat: "Jl. Teratai No. 34 RT 11/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Naufal Haikal",
			tanggalLahir: new Date("2023-02-14"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Fauzi Haikal",
			alamat: "Jl. Teratai No. 36 RT 11/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Alisha Putri",
			tanggalLahir: new Date("2024-11-25"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Wulandari Sari",
			alamat: "Jl. Bougenville No. 38 RT 12/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Dzaky Ramadan",
			tanggalLahir: new Date("2023-01-10"),
			jenisKelamin: JenisKelamin.Laki_laki,
			namaOrtu: "Hermanto Ramadan",
			alamat: "Jl. Bougenville No. 40 RT 12/RW 11",
			posyandu: "Posyandu Rw 11",
		},
		{
			nama: "Meidina Azzahra",
			tanggalLahir: new Date("2024-12-01"),
			jenisKelamin: JenisKelamin.Perempuan,
			namaOrtu: "Kartini Azzahra",
			alamat: "Jl. Melati No. 42 RT 01/RW 11",
			posyandu: "Posyandu Rw 11",
		},
	];

	const createdBalita = await Promise.all(
		balitaData.map((b) => prisma.balita.create({ data: b })),
	);

	console.log(`✅ Balita selesai (${createdBalita.length} data)`);

	// ============================================================
	// IBU HAMIL
	// ============================================================

	const ibuHamilData = [
		{
			nama: "Rina Marlina",
			namaSuami: "Ahmad Fauzi",
			tanggalLahir: new Date("1995-03-20"),
			alamat: "Jl. Kenanga No. 1 RT 01/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 12,
		},
		{
			nama: "Siti Aminah",
			namaSuami: "Budi Santoso",
			tanggalLahir: new Date("1998-07-15"),
			alamat: "Jl. Kenanga No. 3 RT 01/RW 11",
			golDarah: "A",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 20,
		},
		{
			nama: "Dewi Lestari",
			namaSuami: "Hendra Wijaya",
			tanggalLahir: new Date("1997-11-08"),
			alamat: "Jl. Mawar No. 5 RT 02/RW 11",
			golDarah: "B",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 28,
		},
		{
			nama: "Nurul Hidayah",
			namaSuami: "Rizal Hidayat",
			tanggalLahir: new Date("1996-04-25"),
			alamat: "Jl. Mawar No. 7 RT 02/RW 11",
			golDarah: "AB",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 16,
		},
		{
			nama: "Fatimah Zahra",
			namaSuami: "Deni Kurniawan",
			tanggalLahir: new Date("1999-09-12"),
			alamat: "Jl. Anggrek No. 9 RT 03/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 32,
		},
		{
			nama: "Yuni Rahayu",
			namaSuami: "Eko Prasetyo",
			tanggalLahir: new Date("2000-01-30"),
			alamat: "Jl. Anggrek No. 11 RT 03/RW 11",
			golDarah: "A",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 8,
		},
		{
			nama: "Sri Wahyuni",
			namaSuami: "Agus Setiawan",
			tanggalLahir: new Date("1994-06-18"),
			alamat: "Jl. Dahlia No. 13 RT 04/RW 11",
			golDarah: "B",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 36,
		},
		{
			nama: "Lestari Indah",
			namaSuami: "Wahyu Nugroho",
			tanggalLahir: new Date("1997-02-14"),
			alamat: "Jl. Dahlia No. 15 RT 04/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 24,
		},
		{
			nama: "Marlina Sari",
			namaSuami: "Fajar Maulana",
			tanggalLahir: new Date("1996-08-22"),
			alamat: "Jl. Tulip No. 17 RT 05/RW 11",
			golDarah: "A",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 18,
		},
		{
			nama: "Indah Permata",
			namaSuami: "Rudi Hermawan",
			tanggalLahir: new Date("1998-12-05"),
			alamat: "Jl. Tulip No. 19 RT 05/RW 11",
			golDarah: "B",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 30,
		},
		{
			nama: "Kartini Wulandari",
			namaSuami: "Surya Pratama",
			tanggalLahir: new Date("1995-05-10"),
			alamat: "Jl. Cempaka No. 21 RT 06/RW 11",
			golDarah: "AB",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 14,
		},
		{
			nama: "Anisa Fitriani",
			namaSuami: "Dodi Firmansyah",
			tanggalLahir: new Date("1999-10-28"),
			alamat: "Jl. Cempaka No. 23 RT 06/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 22,
		},
		{
			nama: "Rini Susanti",
			namaSuami: "Bambang Santoso",
			tanggalLahir: new Date("1997-03-17"),
			alamat: "Jl. Melur No. 25 RT 07/RW 11",
			golDarah: "A",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 38,
		},
		{
			nama: "Wulandari Asih",
			namaSuami: "Teguh Prabowo",
			tanggalLahir: new Date("1996-07-23"),
			alamat: "Jl. Melur No. 27 RT 07/RW 11",
			golDarah: "B",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 10,
		},
		{
			nama: "Novia Anggraini",
			namaSuami: "Yudi Santoso",
			tanggalLahir: new Date("2000-11-14"),
			alamat: "Jl. Seroja No. 29 RT 08/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 26,
		},
		{
			nama: "Citra Dewi",
			namaSuami: "Arif Rahman",
			tanggalLahir: new Date("1995-09-06"),
			alamat: "Jl. Seroja No. 31 RT 08/RW 11",
			golDarah: "A",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 34,
		},
		{
			nama: "Ratna Sari",
			namaSuami: "Hadi Purnomo",
			tanggalLahir: new Date("1998-04-19"),
			alamat: "Jl. Flamboyan No. 33 RT 09/RW 11",
			golDarah: "AB",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 6,
		},
		{
			nama: "Endang Susilowati",
			namaSuami: "Joko Purnomo",
			tanggalLahir: new Date("1994-08-31"),
			alamat: "Jl. Flamboyan No. 35 RT 09/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 40,
		},
		{
			nama: "Mira Andriani",
			namaSuami: "Tono Hartono",
			tanggalLahir: new Date("1999-02-08"),
			alamat: "Jl. Teratai No. 37 RT 10/RW 11",
			golDarah: "B",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 16,
		},
		{
			nama: "Lia Anggraeni",
			namaSuami: "Sugeng Raharjo",
			tanggalLahir: new Date("1997-06-15"),
			alamat: "Jl. Teratai No. 39 RT 10/RW 11",
			golDarah: "A",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 28,
		},
		{
			nama: "Dian Permatasari",
			namaSuami: "Andi Saputra",
			tanggalLahir: new Date("1996-10-22"),
			alamat: "Jl. Bougenville No. 41 RT 11/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 20,
		},
		{
			nama: "Suci Ramadhani",
			namaSuami: "Ferry Irawan",
			tanggalLahir: new Date("2000-03-05"),
			alamat: "Jl. Bougenville No. 43 RT 11/RW 11",
			golDarah: "A",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 12,
		},
		{
			nama: "Fitri Handayani",
			namaSuami: "Galih Prakoso",
			tanggalLahir: new Date("1995-12-18"),
			alamat: "Jl. Melati No. 45 RT 12/RW 11",
			golDarah: "B",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 32,
		},
		{
			nama: "Mega Wulandari",
			namaSuami: "Irwan Syahputra",
			tanggalLahir: new Date("1998-05-27"),
			alamat: "Jl. Melati No. 47 RT 12/RW 11",
			golDarah: "AB",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 24,
		},
		{
			nama: "Tari Oktaviani",
			namaSuami: "Lukman Hakim",
			tanggalLahir: new Date("1997-09-14"),
			alamat: "Jl. Kenanga No. 49 RT 01/RW 11",
			golDarah: "O",
			posyandu: "Posyandu Rw 11",
			usiaKehamilan: 36,
		},
	];

	const createdIbuHamil = await Promise.all(
		ibuHamilData.map((i) => prisma.ibuHamil.create({ data: i })),
	);

	console.log(`✅ Ibu Hamil selesai (${createdIbuHamil.length} data)`);

	// ============================================================
	// PEMERIKSAAN BALITA
	// ============================================================

	const pemeriksaanBalitaData = [
		{
			nama: "Aisyah Putri Rahayu",
			tanggal: new Date("2025-10-15"),
			berat: 8.5,
			tinggi: 70.2,
			lingkarKepala: 44.5,
			keterangan: "Pertumbuhan baik",
		},
		{
			nama: "Muhammad Rizki Pratama",
			tanggal: new Date("2025-10-15"),
			berat: 10.2,
			tinggi: 76.5,
			lingkarKepala: 46.0,
			keterangan: "Aktif dan sehat",
		},
		{
			nama: "Nazwa Aulia Putri",
			tanggal: new Date("2025-10-16"),
			berat: 7.8,
			tinggi: 68.0,
			lingkarKepala: 43.0,
			keterangan: "Berat sedikit kurang",
		},
		{
			nama: "Arya Dimas Santoso",
			tanggal: new Date("2025-10-16"),
			berat: 11.5,
			tinggi: 80.0,
			lingkarKepala: 47.5,
			keterangan: "Pertumbuhan normal",
		},
		{
			nama: "Nayla Sari Putri",
			tanggal: new Date("2025-10-17"),
			berat: 7.2,
			tinggi: 65.5,
			lingkarKepala: 42.5,
			keterangan: "Baik",
		},
		{
			nama: "Farhan Adhitya",
			tanggal: new Date("2025-10-17"),
			berat: 12.0,
			tinggi: 83.0,
			lingkarKepala: 48.0,
			keterangan: "Sangat aktif",
		},
		{
			nama: "Salsabila Nurhaliza",
			tanggal: new Date("2025-10-18"),
			berat: 8.0,
			tinggi: 69.5,
			lingkarKepala: 43.5,
			keterangan: "Pertumbuhan baik",
		},
		{
			nama: "Daffa Ramadhan",
			tanggal: new Date("2025-10-18"),
			berat: 10.8,
			tinggi: 78.0,
			lingkarKepala: 46.5,
			keterangan: "Normal",
		},
		{
			nama: "Kirana Aulia",
			tanggal: new Date("2025-10-19"),
			berat: 6.8,
			tinggi: 63.0,
			lingkarKepala: 41.5,
			keterangan: "Perlu perhatian berat badan",
		},
		{
			nama: "Rafa Ardiansyah",
			tanggal: new Date("2025-10-19"),
			berat: 13.0,
			tinggi: 86.0,
			lingkarKepala: 49.0,
			keterangan: "Sehat dan aktif",
		},
		{
			nama: "Zahra Permata Sari",
			tanggal: new Date("2025-10-20"),
			berat: 8.2,
			tinggi: 70.0,
			lingkarKepala: 44.0,
			keterangan: "Pertumbuhan normal",
		},
		{
			nama: "Raihan Maulana",
			tanggal: new Date("2025-10-20"),
			berat: 9.5,
			tinggi: 74.5,
			lingkarKepala: 45.5,
			keterangan: "Baik",
		},
		{
			nama: "Annisa Fitria",
			tanggal: new Date("2025-10-21"),
			berat: 7.5,
			tinggi: 66.5,
			lingkarKepala: 43.0,
			keterangan: "Normal",
		},
		{
			nama: "Gibran Putra",
			tanggal: new Date("2025-10-21"),
			berat: 11.0,
			tinggi: 79.0,
			lingkarKepala: 47.0,
			keterangan: "Pertumbuhan baik",
		},
		{
			nama: "Putri Cahaya",
			tanggal: new Date("2025-10-22"),
			berat: 6.5,
			tinggi: 62.0,
			lingkarKepala: 41.0,
			keterangan: "Perlu pemantauan",
		},
		{
			nama: "Hafiz Abdillah",
			tanggal: new Date("2025-10-22"),
			berat: 10.5,
			tinggi: 77.5,
			lingkarKepala: 46.0,
			keterangan: "Sehat",
		},
		{
			nama: "Syifa Nur Aisyah",
			tanggal: new Date("2025-10-23"),
			berat: 8.8,
			tinggi: 71.5,
			lingkarKepala: 44.5,
			keterangan: "Normal",
		},
		{
			nama: "Farel Arif Kurniawan",
			tanggal: new Date("2025-10-23"),
			berat: 12.5,
			tinggi: 84.5,
			lingkarKepala: 48.5,
			keterangan: "Aktif",
		},
		{
			nama: "Adelia Maharani",
			tanggal: new Date("2025-10-24"),
			berat: 7.0,
			tinggi: 64.0,
			lingkarKepala: 42.0,
			keterangan: "Pertumbuhan baik",
		},
		{
			nama: "Rafka Aditya",
			tanggal: new Date("2025-10-24"),
			berat: 13.5,
			tinggi: 88.0,
			lingkarKepala: 49.5,
			keterangan: "Sangat sehat",
		},
		{
			nama: "Keisya Nabila",
			tanggal: new Date("2025-10-25"),
			berat: 6.2,
			tinggi: 61.0,
			lingkarKepala: 40.5,
			keterangan: "Perlu perhatian",
		},
		{
			nama: "Naufal Haikal",
			tanggal: new Date("2025-10-25"),
			berat: 14.0,
			tinggi: 90.0,
			lingkarKepala: 50.0,
			keterangan: "Normal",
		},
		{
			nama: "Alisha Putri",
			tanggal: new Date("2025-10-26"),
			berat: 7.8,
			tinggi: 68.5,
			lingkarKepala: 43.5,
			keterangan: "Baik",
		},
		{
			nama: "Dzaky Ramadan",
			tanggal: new Date("2025-10-26"),
			berat: 11.8,
			tinggi: 81.5,
			lingkarKepala: 47.5,
			keterangan: "Pertumbuhan normal",
		},
		{
			nama: "Meidina Azzahra",
			tanggal: new Date("2025-10-27"),
			berat: 7.5,
			tinggi: 67.0,
			lingkarKepala: 42.5,
			keterangan: "Normal",
		},
	];

	for (const item of pemeriksaanBalitaData) {
		const balita = createdBalita.find((b) => b.nama === item.nama);
		if (!balita) {
			console.warn(`⚠️  Balita tidak ditemukan: ${item.nama}`);
			continue;
		}
		await prisma.pemeriksaanBalita.create({
			data: {
				balitaId: balita.id,
				tanggal: item.tanggal,
				berat: item.berat,
				tinggi: item.tinggi,
				lingkarKepala: item.lingkarKepala,
				keterangan: item.keterangan,
			},
		});
	}

	console.log(
		`✅ Pemeriksaan Balita selesai (${pemeriksaanBalitaData.length} data)`,
	);

	// ============================================================
	// PEMERIKSAAN IBU HAMIL
	// ============================================================

	const pemeriksaanIbuHamilData = [
		{
			nama: "Rina Marlina",
			tanggal: new Date("2025-10-15"),
			usiaKehamilan: 12,
			berat: 58.5,
			tinggi: 158,
			tensi: "110/70",
			keterangan: "Kondisi baik",
		},
		{
			nama: "Siti Aminah",
			tanggal: new Date("2025-10-15"),
			usiaKehamilan: 20,
			berat: 65.0,
			tinggi: 160,
			tensi: "120/80",
			keterangan: "Normal",
		},
		{
			nama: "Dewi Lestari",
			tanggal: new Date("2025-10-16"),
			usiaKehamilan: 28,
			berat: 72.5,
			tinggi: 155,
			tensi: "118/78",
			keterangan: "Pertumbuhan janin baik",
		},
		{
			nama: "Nurul Hidayah",
			tanggal: new Date("2025-10-16"),
			usiaKehamilan: 16,
			berat: 60.0,
			tinggi: 162,
			tensi: "115/75",
			keterangan: "Baik",
		},
		{
			nama: "Fatimah Zahra",
			tanggal: new Date("2025-10-17"),
			usiaKehamilan: 32,
			berat: 75.0,
			tinggi: 157,
			tensi: "125/85",
			keterangan: "Perlu pantau tekanan darah",
		},
		{
			nama: "Yuni Rahayu",
			tanggal: new Date("2025-10-17"),
			usiaKehamilan: 8,
			berat: 55.0,
			tinggi: 163,
			tensi: "110/70",
			keterangan: "Normal",
		},
		{
			nama: "Sri Wahyuni",
			tanggal: new Date("2025-10-18"),
			usiaKehamilan: 36,
			berat: 78.5,
			tinggi: 156,
			tensi: "120/80",
			keterangan: "Mendekati persalinan",
		},
		{
			nama: "Lestari Indah",
			tanggal: new Date("2025-10-18"),
			usiaKehamilan: 24,
			berat: 68.0,
			tinggi: 159,
			tensi: "118/76",
			keterangan: "Kondisi baik",
		},
		{
			nama: "Marlina Sari",
			tanggal: new Date("2025-10-19"),
			usiaKehamilan: 18,
			berat: 62.5,
			tinggi: 161,
			tensi: "112/72",
			keterangan: "Normal",
		},
		{
			nama: "Indah Permata",
			tanggal: new Date("2025-10-19"),
			usiaKehamilan: 30,
			berat: 73.0,
			tinggi: 158,
			tensi: "122/82",
			keterangan: "Baik",
		},
		{
			nama: "Kartini Wulandari",
			tanggal: new Date("2025-10-20"),
			usiaKehamilan: 14,
			berat: 59.5,
			tinggi: 160,
			tensi: "110/70",
			keterangan: "Pertumbuhan normal",
		},
		{
			nama: "Anisa Fitriani",
			tanggal: new Date("2025-10-20"),
			usiaKehamilan: 22,
			berat: 66.5,
			tinggi: 157,
			tensi: "116/76",
			keterangan: "Normal",
		},
		{
			nama: "Rini Susanti",
			tanggal: new Date("2025-10-21"),
			usiaKehamilan: 38,
			berat: 80.0,
			tinggi: 155,
			tensi: "128/88",
			keterangan: "Segera persiapkan persalinan",
		},
		{
			nama: "Wulandari Asih",
			tanggal: new Date("2025-10-21"),
			usiaKehamilan: 10,
			berat: 56.5,
			tinggi: 162,
			tensi: "108/68",
			keterangan: "Baik",
		},
		{
			nama: "Novia Anggraini",
			tanggal: new Date("2025-10-22"),
			usiaKehamilan: 26,
			berat: 70.0,
			tinggi: 159,
			tensi: "120/80",
			keterangan: "Normal",
		},
		{
			nama: "Citra Dewi",
			tanggal: new Date("2025-10-22"),
			usiaKehamilan: 34,
			berat: 76.5,
			tinggi: 156,
			tensi: "124/84",
			keterangan: "Kondisi baik",
		},
		{
			nama: "Ratna Sari",
			tanggal: new Date("2025-10-23"),
			usiaKehamilan: 6,
			berat: 54.0,
			tinggi: 163,
			tensi: "110/70",
			keterangan: "Awal kehamilan normal",
		},
		{
			nama: "Endang Susilowati",
			tanggal: new Date("2025-10-23"),
			usiaKehamilan: 40,
			berat: 82.0,
			tinggi: 157,
			tensi: "130/90",
			keterangan: "Siap persalinan",
		},
		{
			nama: "Mira Andriani",
			tanggal: new Date("2025-10-24"),
			usiaKehamilan: 16,
			berat: 61.0,
			tinggi: 160,
			tensi: "114/74",
			keterangan: "Normal",
		},
		{
			nama: "Lia Anggraeni",
			tanggal: new Date("2025-10-24"),
			usiaKehamilan: 28,
			berat: 71.5,
			tinggi: 158,
			tensi: "118/78",
			keterangan: "Pertumbuhan janin baik",
		},
		{
			nama: "Dian Permatasari",
			tanggal: new Date("2025-10-25"),
			usiaKehamilan: 20,
			berat: 64.0,
			tinggi: 161,
			tensi: "116/76",
			keterangan: "Baik",
		},
		{
			nama: "Suci Ramadhani",
			tanggal: new Date("2025-10-25"),
			usiaKehamilan: 12,
			berat: 57.5,
			tinggi: 162,
			tensi: "110/70",
			keterangan: "Normal",
		},
		{
			nama: "Fitri Handayani",
			tanggal: new Date("2025-10-26"),
			usiaKehamilan: 32,
			berat: 74.5,
			tinggi: 156,
			tensi: "122/82",
			keterangan: "Kondisi baik",
		},
		{
			nama: "Mega Wulandari",
			tanggal: new Date("2025-10-26"),
			usiaKehamilan: 24,
			berat: 67.5,
			tinggi: 159,
			tensi: "118/78",
			keterangan: "Normal",
		},
		{
			nama: "Tari Oktaviani",
			tanggal: new Date("2025-10-27"),
			usiaKehamilan: 36,
			berat: 79.0,
			tinggi: 157,
			tensi: "126/86",
			keterangan: "Mendekati persalinan",
		},
	];

	for (const item of pemeriksaanIbuHamilData) {
		const ibuHamil = createdIbuHamil.find((i) => i.nama === item.nama);
		if (!ibuHamil) {
			console.warn(`⚠️  Ibu Hamil tidak ditemukan: ${item.nama}`);
			continue;
		}
		await prisma.pemeriksaanIbuHamil.create({
			data: {
				ibuHamilId: ibuHamil.id,
				tanggal: item.tanggal,
				usiaKehamilan: item.usiaKehamilan,
				berat: item.berat,
				tinggi: item.tinggi,
				tensi: item.tensi,
				keterangan: item.keterangan,
			},
		});
	}

	console.log(
		`✅ Pemeriksaan Ibu Hamil selesai (${pemeriksaanIbuHamilData.length} data)`,
	);
	console.log("🎉 Seeding selesai!");
}

main()
	.catch((e) => {
		console.error("❌ Seeding gagal:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
