import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import products from '@/data/products.json';
import type { Product } from '@/types/product';

export default function StoreHome() {
  const list = products as unknown as Product[];

  return (
    <main>
      <Header />
      <section className="p-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {list.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="block border p-3 hover:opacity-90"
            >
              <div className="aspect-square flex items-center justify-center bg-gray-100">
                <Image
                  src={p.image || '/products/placeholder.webp'}
                  alt={p.name}
                  width={1200}
                  height={1200}
                  className="object-contain w-1/2 h-1/2"
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="truncate">{p.name}</span>
                <span>${p.price}</span>
              </div>
              <div className="text-xs text-gray-500">{p.id}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}