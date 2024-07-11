/*
  Warnings:

  - A unique constraint covering the columns `[producerId,movieId]` on the table `MovieProducer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studioId,movieId]` on the table `MovieStudio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieProducer_producerId_movieId_key" ON "MovieProducer"("producerId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieStudio_studioId_movieId_key" ON "MovieStudio"("studioId", "movieId");
