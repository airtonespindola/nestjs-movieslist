import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';
import { PrismaClient } from '@prisma/client';
import type { CsvRow } from './seed.types';
import * as cliProgress from 'cli-progress';

function getParsedCsv(): Promise<CsvRow[]> {
  return new Promise((resolve) => {
    const results = [];

    fs.createReadStream(path.join(__dirname, '../movielist.csv'))
      .pipe(csvParser({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      });
  });
}

function formatCsvRow(row: CsvRow) {
  const parseEntities = (entities: string) =>
    entities
      .replaceAll(' and ', ',')
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean);

  return {
    title: row.title,
    year: parseInt(row.year),
    winner: row.winner === 'yes',
    studios: parseEntities(row.studios),
    producers: parseEntities(row.producers),
  };
}

export async function main() {
  const prisma = new PrismaClient();
  const data = await getParsedCsv();

  console.log('Running seed...');

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar.start(data.length, 0);

  for (const index in data) {
    bar.update(+index + 1);

    const row = formatCsvRow(data[index]);

    const { id: movieId } = await prisma.movie.upsert({
      create: { name: row.title },
      update: {},
      where: { name: row.title },
    });

    await prisma.indication.upsert({
      create: {
        year: row.year,
        winner: row.winner,
        movieId,
      },
      update: { winner: row.winner },
      where: {
        year_movieId: {
          year: row.year,
          movieId,
        },
      },
    });

    for (const name of row.studios) {
      const { id: studioId } = await prisma.studio.upsert({
        create: { name },
        update: {},
        where: { name },
      });

      await prisma.movieStudio.upsert({
        create: { movieId, studioId },
        update: {},
        where: { studioId_movieId: { movieId, studioId } },
      });
    }

    for (const name of row.producers) {
      const { id: producerId } = await prisma.producer.upsert({
        create: { name },
        update: {},
        where: { name },
      });

      await prisma.movieProducer.upsert({
        create: { movieId, producerId },
        update: {},
        where: { producerId_movieId: { movieId, producerId } },
      });
    }
  }

  bar.stop();
}

main();
