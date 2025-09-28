import { NextResponse } from 'next/server';
import data from '@/data/products.json';

export const dynamic = 'force-dynamic'; // 항상 최신(캐시 X) - 포트폴리오용 간단 설정

export function GET() {
  return NextResponse.json(data, { status: 200 });
}