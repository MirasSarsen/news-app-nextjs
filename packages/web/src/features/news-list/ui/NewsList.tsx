// packages/web/src/features/news-list/ui/NewsList.tsx
'use client';

import React, { useState } from 'react';
import { useTopHeadlinesQuery } from '../../../shared/newsApi';
import type { NewsItem } from '../../../entities/news/types';
import Image from 'next/image';

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="border rounded p-4 flex gap-4">
      {item.urlToImage ? (
        <Image src={item.urlToImage} alt={item.title} width={120} height={80} className="object-cover rounded" />
      ) : (
        <div style={{ width: 120, height: 80 }} className="bg-gray-200 rounded" />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <div className="text-xs text-gray-400 mt-2">{new Date(item.publishedAt || Date.now()).toLocaleString()}</div>
      </div>
    </article>
  );
}

export default function NewsList() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const { data, error, isLoading, isFetching, refetch } = useTopHeadlinesQuery({ page, q });

  return (
    <section className="space-y-4">
      <div className="flex gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} className="border p-2 rounded flex-1" placeholder="Search..." />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => { setPage(1); refetch(); }}>
          Search
        </button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error. <button onClick={() => refetch()} className="underline">Retry</button></div>}

      <div className="grid gap-4">
        {data?.articles?.map((a, i) => <NewsCard key={a.url + i} item={a} />)}
      </div>

      <div className="flex justify-between items-center">
        <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
        <div>Page {page} {isFetching ? '...' : ''}</div>
        <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </section>
  );
}
