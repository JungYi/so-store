'use client';

import Header from '@/components/Header';
import { useCartStore } from '@/lib/store/cart';

export default function CartPage() {
  const { items, updateQty, remove, subtotal } = useCartStore();

  return (
    <main>
      <Header />
      <section className="p-4">
        {items.length === 0 ? (
          <p className="text-sm text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={`${it.id}-${it.size}`} className="flex items-center justify-between border p-3">
                <div>
                  <div className="text-sm font-medium">
                    {it.name} {it.size ? `(${it.size})` : null}
                  </div>
                  <div className="text-xs text-gray-500">{it.id}</div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => updateQty(it.id, it.size, Number(e.target.value))}
                    className="w-16 border px-2 py-1"
                  />
                  <div className="w-16 text-right text-sm">${it.price * it.qty}</div>
                  <button
                    type="button"
                    onClick={() => remove(it.id, it.size)}
                    className="text-sm underline"
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
      </section>
    </main>
  );
}