import { LRUCache } from 'lru-cache';

// Cache for 1 hour, max 500 items
export const githubCache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
});
