'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import { useCartStore } from '@/lib/store/cart';

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const add = useCartStore((s) => s.add);

  const product = {
    id: String(params.id),
    name: 'Mock Product',
    price: 59,
  };

  const onAdd = () => {
    add({ id: product.id, name: product.name, price: product.price, size: 'M' }, 1);
  };

  return (
    <main>
      <Header />
      <section className="p-4 grid gap-4 md:grid-cols-2">
        <div className="aspect-square bg-gray-100" />
        <div>
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="mt-1 text-sm text-gray-600">{product.id}</p>
          <p className="mt-2 text-lg">${product.price}</p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 w-full bg-black px-4 py-2 text-white"
          >
            Add to cart
          </button>
        </div>
      </section>
    </main>
  );
}