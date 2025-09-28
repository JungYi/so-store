import { NextResponse } from 'next/server';
import products from '@/data/products.json';
import type { Product } from '@/types/product';

type Params = { id: string };

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params;

  const list = products as unknown as Product[];
  const item = list.find((p) => p.id === id);

  if (!item) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(item, { status: 200 });
}

export const dynamic = 'force-dynamic';