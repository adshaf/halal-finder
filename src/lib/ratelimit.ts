import { RateLimiterMemory } from "rate-limiter-flexible";
import { NextRequest } from "next/server";

// 10 attempts per 15 minutes per IP — brute-force protection for admin login
export const adminLoginRateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 15 * 60,
});

export function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous"
  );
}
