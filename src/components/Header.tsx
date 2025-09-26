'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';

export default function Header() {
  const count = useCartStore((s) => s.items.reduce((acc, it) => acc + it.qty, 0));

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <Link href="/" className="text-sm font-semibold tracking-widest">
        SO/STORE
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/cart" className="relative text-sm">
          Cart
          {count > 0 ? (
            <span className="absolute -right-3 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">
              {count}
            </span>
          ) : null}
        </Link>
      </nav>
    </header>
  );
}