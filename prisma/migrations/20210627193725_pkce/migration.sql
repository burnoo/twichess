/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `LichessToken` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `LichessToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LichessToken" DROP COLUMN "refreshToken",
DROP COLUMN "expiresAt";
