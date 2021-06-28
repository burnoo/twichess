/*
  Warnings:

  - You are about to drop the `Streamer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LichessToStreamer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LichessToStreamer" DROP CONSTRAINT "_LichessToStreamer_A_fkey";

-- DropForeignKey
ALTER TABLE "_LichessToStreamer" DROP CONSTRAINT "_LichessToStreamer_B_fkey";

-- DropTable
DROP TABLE "Streamer";

-- DropTable
DROP TABLE "_LichessToStreamer";

-- CreateTable
CREATE TABLE "StreamerCache" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avgViewersRating" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LichessToStreamerCache" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StreamerCache.name_unique" ON "StreamerCache"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_LichessToStreamerCache_AB_unique" ON "_LichessToStreamerCache"("A", "B");

-- CreateIndex
CREATE INDEX "_LichessToStreamerCache_B_index" ON "_LichessToStreamerCache"("B");

-- AddForeignKey
ALTER TABLE "_LichessToStreamerCache" ADD FOREIGN KEY ("A") REFERENCES "lichess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LichessToStreamerCache" ADD FOREIGN KEY ("B") REFERENCES "StreamerCache"("id") ON DELETE CASCADE ON UPDATE CASCADE;
