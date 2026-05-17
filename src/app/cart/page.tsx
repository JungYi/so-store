'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useCartStore } from '@/lib/store/cart';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQty, remove, subtotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main />;
  }

  return (
    <main>
      <Header />
      <section className="p-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={`${it.id}-${it.size}`} className="border p-3 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium">
                    {it.name} {it.size ? `(${it.size})` : null}
                  </div>
                  <div className="text-xs text-gray-500">{it.id}</div>
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:mt-0 sm:flex-row sm:items-center sm:gap-3">
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => updateQty(it.id, it.size, Number(e.target.value))}
                    className="w-full border px-2 py-1 sm:w-16"
                    aria-label={`Quantity for ${it.name}`}
                  />
                  <div className="text-sm sm:w-16 sm:text-right">${it.price * it.qty}</div>
                  <button
                    type="button"
                    onClick={() => remove(it.id, it.size)}
                    className="self-start text-sm underline sm:self-auto"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-sm">Subtotal</span>
          <span className="text-sm font-semibold">${subtotal()}</span>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
          {items.length > 0 ? (
            <Link
              href="/checkout"
              className="block w-full bg-black px-4 py-2 text-center text-sm text-white hover:opacity-90 focus:outline-none focus:ring sm:w-auto sm:min-w-40"
            >
              Checkout
            </Link>
          ) : null}
          <Link
            href="/"
            className="text-center text-sm text-gray-600 underline hover:text-black focus:outline-none focus:ring"
          >
            Back to store
          </Link>
        </div>
      </section>
    </main>
  );
}
