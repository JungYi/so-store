'use client';

import Header from '@/components/Header';
import { useCartStore } from '@/lib/store/cart';
import { useState } from 'react';

export default function CheckoutPage() {
  const total = useCartStore((s) => s.subtotal());
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <Header />
      <section className="p-4 grid gap-6 md:grid-cols-2">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <h2 className="text-lg font-semibold">Contact & Shipping</h2>
          <input className="w-full border px-3 py-2" placeholder="Full name" />
          <input className="w-full border px-3 py-2" placeholder="Email" />
          <input className="w-full border px-3 py-2" placeholder="Address" />
          <input className="w-full border px-3 py-2" placeholder="City" />
          <input className="w-full border px-3 py-2" placeholder="Postal code" />
          <button type="submit" className="w-full bg-black px-4 py-2 text-white">
            Pay (Mock)
          </button>
          {submitted ? <p className="text-sm text-green-600">Order placed (demo).</p> : null}
        </form>

        <aside className="border p-4">
          <h3 className="text-sm font-semibold">Summary</h3>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>${total}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span>Shipping</span>
            <span>$0</span>
          </div>
          <div className="mt-2 border-t pt-2 flex items-center justify-between text-sm">
            <span>Total</span>
            <span className="font-semibold">${total}</span>
          </div>
        </aside>
      </section>
    </main>
  );
}