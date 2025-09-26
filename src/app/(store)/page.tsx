import Header from '@/components/Header';
import Link from 'next/link';

export default function StoreHome() {
  // Temporary mock list
  const products = [
    { id: 'SO-01', name: 'Mock Tee', price: 39 },
    { id: 'SO-02', name: 'Mock Hoodie', price: 79 },
    { id: 'SO-03', name: 'Mock Cap', price: 29 },
  ];

  return (
    <main>
      <Header />
      <section className="p-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="block border p-3 hover:opacity-90"
            >
              <div className="aspect-square bg-gray-100" />
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