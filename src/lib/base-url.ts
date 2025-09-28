export function getBaseUrl(): string {
  if (typeof window !== 'undefined') return '';                    // 브라우저: 상대경로 OK
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Vercel
  const port = process.env.PORT ?? 3000;
  return `http://localhost:${port}`;                               // 로컬 dev/SSR
}