type RateLimitEntry = {
    requests: number[];
  };
  
  type RateLimitResult = {
    success: boolean;
    limit: number;
    remaining: number;
    retryAfter: number;
  };
  
  const requests = new Map<string, RateLimitEntry>();
  
  const WINDOW_MS = 15 * 60 * 1000;
  const MAX_REQUESTS = 5;
  const MAX_TRACKED_IPS = 10_000;
  
  let requestCount = 0;
  
  export function checkRateLimit(
    identifier: string,
    limit = MAX_REQUESTS,
    windowMs = WINDOW_MS
  ): RateLimitResult {
    const now = Date.now();
    const windowStart = now - windowMs;
  
    const entry = requests.get(identifier) ?? { requests: [] };
  
    // Remove requests outside the current time window.
    entry.requests = entry.requests.filter(
      (timestamp) => timestamp > windowStart
    );
  
    if (entry.requests.length >= limit) {
      const retryAfter = Math.ceil(
        (entry.requests[0] + windowMs - now) / 1000
      );
  
      requests.set(identifier, entry);
  
      return {
        success: false,
        limit,
        remaining: 0,
        retryAfter: Math.max(1, retryAfter),
      };
    }
  
    entry.requests.push(now);
    requests.set(identifier, entry);
  
    // Periodically remove expired IP entries.
    requestCount++;
  
    if (requestCount % 100 === 0) {
      for (const [ip, data] of requests.entries()) {
        data.requests = data.requests.filter(
          (timestamp) => timestamp > windowStart
        );
  
        if (data.requests.length === 0) {
          requests.delete(ip);
        }
      }
    }
  
    // Prevent the map from growing indefinitely.
    if (requests.size > MAX_TRACKED_IPS) {
      const oldestKey = requests.keys().next().value;
  
      if (oldestKey) {
        requests.delete(oldestKey);
      }
    }
  
    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - entry.requests.length),
      retryAfter: 0,
    };
  }
  
  export function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
  
    if (forwardedFor) {
      return forwardedFor.split(",")[0].trim();
    }
  
    return (
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown"
    );
  }