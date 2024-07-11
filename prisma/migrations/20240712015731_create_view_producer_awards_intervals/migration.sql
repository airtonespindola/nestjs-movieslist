CREATE VIEW ProducerAwardsIntervals AS
SELECT
  p.name AS producer,
  MIN(i.year) AS previousWin,
  MAX(i.year) AS followWin,
  MAX(i.year) - MIN(i.year) AS interval
FROM Producer p
INNER JOIN MovieProducer mp ON mp.producerId = p.id
INNER JOIN Movie m ON m.id = mp.movieId
INNER JOIN Indication i ON i.movieId = m.id AND i.winner = true
GROUP BY p.id
HAVING COUNT(i.id) > 1;
