"use client";

import { useGetNewsQuery } from "@/shared/api/adminApi";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
  const { data, isLoading, error } = useGetNewsQuery(null);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">Ошибка загрузки новостей</p>;

  const news = data?.items || [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Новости</h1>

        <Link
          href="/news/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Добавить новость
        </Link>
      </div>

      {/* Таблица */}
      <div className="overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-800">
        <table className="w-full border-collapse">
          <thead className="bg-zinc-200 dark:bg-zinc-800">
            <tr>
              <th className="p-4 text-left font-semibold">ID</th>
              <th className="p-4 text-left font-semibold">Заголовок</th>
              <th className="p-4 text-left font-semibold">Автор</th>
              <th className="p-4 text-left font-semibold">Дата</th>
              <th className="p-4 text-left font-semibold">Действия</th>
            </tr>
          </thead>

          <tbody>
            {news.map((n: any) => (
              <tr
                key={n.id}
                className="border-t border-zinc-300 dark:border-zinc-700"
              >
                <td classname="p-4">{n.id}</td>
                <td className="p-4">{n.title}</td>
                <td className="p-4">{n.author}</td>
                <td className="p-4">{n.createdAt?.slice(0, 10)}</td>

                <td className="p-4 flex gap-3">
                  <Link
                    href={`/news/edit/${n.id}`}
                    className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black"
                  >
                    <Edit size={18} />
                  </Link>

                  <button className="p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {news.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-6 text-zinc-500 dark:text-zinc-400"
                >
                  Нет новостей
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
