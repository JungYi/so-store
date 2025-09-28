'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import Header from '@/components/Header';
import { useCartStore } from '@/lib/store/cart';
import type { Product } from '@/types/product';

type FetchState =
  | { status: 'idle' | 'loading' }
  | { status: 'error'; message: string }
  | { status: 'notfound' }
  | { status: 'success'; data: Product };

export default function ProductDetail() {
  const [state, setState] = useState<FetchState>({ status: 'idle' });
  const add = useCartStore((s) => s.add);
  const params = useParams<{ id: string }>();
  const id = params?.id;

  useEffect(() => {
    if (!id) {
      setState({ status: 'notfound' });
      return;
    }

    const controller = new AbortController();

    async function run(): Promise<void> {
      try {
        setState({ status: 'loading' });

        const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
          cache: 'no-store',
          signal: controller.signal,
        });

        if (res.status === 404) {
          setState({ status: 'notfound' });
          return;
        }
        if (!res.ok) {
          setState({ status: 'error', message: 'Failed to load product.' });
          return;
        }

        const data: Product = await res.json();
        setState({ status: 'success', data });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setState({ status: 'error', message: 'Network error occurred.' });
      }
    }

    void run();
    return () => controller.abort();
  }, [id]);

  const handleAdd = (): void => {
    if (state.status !== 'success') return;
    const p = state.data;
    add({ id: p.id, name: p.name, price: p.price, size: 'M' }, 1);
  };

  return (
    <main>
      <Header />

      {state.status === 'loading' && (
        <section className="p-6">
          <div className="mx-auto max-w-3xl animate-pulse">
            <div className="aspect-square bg-gray-100" />
            <div className="mt-6 h-5 w-1/3 bg-gray-100" />
            <div className="mt-3 h-4 w-1/5 bg-gray-100" />
            <div className="mt-4 h-10 w-full bg-gray-100" />
          </div>
        </section>
      )}

      {state.status === 'error' && (
        <section className="p-6 text-center">
          <p className="text-sm text-red-600">{state.message}</p>
          <Link href="/products" className="mt-4 inline-block underline">
            Back to products
          </Link>
        </section>
      )}

      {state.status === 'notfound' && (
        <section className="p-6 text-center">
          <p className="text-sm">Product not found.</p>
          <Link href="/products" className="mt-4 inline-block underline">
            Back to products
          </Link>
        </section>
      )}

      {state.status === 'success' && (
        <section className="p-4 grid gap-6 md:grid-cols-2">
          <div className="aspect-square flex items-center justify-center bg-gray-100">
            <Image
              src={state.data.image}
              alt={state.data.name}
              width={1200}
              height={1200}
              className="object-contain w-3/4 h-3/4"
              priority
            />
          </div>

          <div>
            <h1 className="text-xl font-semibold">{state.data.name}</h1>
            <p className="mt-1 text-sm text-gray-600">{state.data.id}</p>
            <p className="mt-2 text-lg">${state.data.price}</p>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-4 w-full bg-black px-4 py-2 text-white cursor-pointer hover:opacity-90 focus:outline-none focus:ring"
              aria-label="Add to cart"
            >
              Add to cart
            </button>

            <Link
              href="/"
              className="mt-3 inline-block text-sm text-gray-600 underline"
            >
              Back to store
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}