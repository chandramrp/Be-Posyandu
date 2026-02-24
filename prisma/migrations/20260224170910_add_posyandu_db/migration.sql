-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('Admin', 'Kader') NOT NULL,
    `status` ENUM('Aktif', 'Nonaktif') NOT NULL DEFAULT 'Aktif',
    `token` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `balita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `jenisKelamin` ENUM('Laki_laki', 'Perempuan') NOT NULL,
    `namaOrtu` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `posyandu` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ibu_hamil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `namaSuami` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `golDarah` VARCHAR(191) NOT NULL,
    `posyandu` VARCHAR(191) NOT NULL,
    `usiaKehamilan` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemeriksaan_balita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balitaId` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `berat` DECIMAL(65, 30) NOT NULL,
    `tinggi` DECIMAL(65, 30) NOT NULL,
    `lingkarKepala` DECIMAL(65, 30) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemeriksaan_ibu_hamil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ibuHamilId` INTEGER NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `usiaKehamilan` INTEGER NOT NULL,
    `berat` DECIMAL(65, 30) NOT NULL,
    `tinggi` DECIMAL(65, 30) NOT NULL,
    `tensi` VARCHAR(191) NOT NULL,
    `keterangan` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pemeriksaan_balita` ADD CONSTRAINT `pemeriksaan_balita_balitaId_fkey` FOREIGN KEY (`balitaId`) REFERENCES `balita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pemeriksaan_ibu_hamil` ADD CONSTRAINT `pemeriksaan_ibu_hamil_ibuHamilId_fkey` FOREIGN KEY (`ibuHamilId`) REFERENCES `ibu_hamil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
