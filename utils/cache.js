import cacheManager, { caching } from 'cache-manager'

export const pkceCache = global.pkceCache || cacheManager.caching({ store: 'memory', ttl: 30 * 60 });

if (process.env.NODE_ENV === "development") global.pkceCache = pkceCache;