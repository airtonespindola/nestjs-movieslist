CREATE VIEW ProducerAwardsIntervals AS
WITH RankedMovies AS (
  SELECT
    p.name AS producer,
    i.year AS awardYear,
    ROW_NUMBER() OVER (PARTITION BY p.name ORDER BY i.year) AS rowNum
  FROM Producer p
  INNER JOIN MovieProducer mp ON mp.producerId = p.id
  INNER JOIN Movie m ON m.id = mp.movieId
  INNER JOIN Indication i ON i.movieId = m.id AND i.winner = true
)

SELECT
  rm1.producer,
  rm1.awardYear AS previousWin,
  rm2.awardYear AS followWin,
  rm2.awardYear - rm1.awardYear AS interval
FROM RankedMovies rm1
INNER JOIN RankedMovies rm2 ON rm1.producer = rm2.producer AND rm1.rowNum = rm2.rowNum - 1