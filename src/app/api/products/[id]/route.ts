import { NextResponse } from 'next/server';
import data from '@/data/products.json';

type Params = { id: string };

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params; // ✅ params 대기

  const item = (data as any[]).find((p) => p.id === id);
  if (!item) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(item, { status: 200 });
}

export const dynamic = 'force-dynamic';