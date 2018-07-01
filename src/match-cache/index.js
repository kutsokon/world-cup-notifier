const cachedGames = [];

export function cacheGame(gameToCache) {
  const isPresent = cachedGames.find(game => game.fifa_id === gameToCache.fifa_id);

  if (!isPresent) {
    cachedGames.push(gameToCache);
  }
}

export function getCachedGame(id) {
  return cachedGames.find(game => game.fifa_id === id);
}
