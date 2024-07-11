-- CreateTable
CREATE TABLE "Producer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieStudio" (
    "studioId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    PRIMARY KEY ("studioId", "movieId"),
    CONSTRAINT "MovieStudio_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieStudio_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MovieProducer" (
    "producerId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    PRIMARY KEY ("producerId", "movieId"),
    CONSTRAINT "MovieProducer_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieProducer_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Indication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "winner" BOOLEAN NOT NULL,
    "movieId" INTEGER NOT NULL,
    CONSTRAINT "Indication_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_name_key" ON "Producer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_name_key" ON "Studio"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_name_key" ON "Movie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Indication_year_movieId_key" ON "Indication"("year", "movieId");
