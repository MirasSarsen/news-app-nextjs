"use client";

import {
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} from "../../shared/api/adminApi";
import { useState } from "react";

export default function ManageNews() {
  const { data, isLoading } = useGetNewsQuery();
  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();
  const [deleteNews] = useDeleteNewsMutation();

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    urlToImage: "",
  });

  if (isLoading) return <p>Загрузка...</p>;

  const onSubmit = async () => {
    if (!form.title.trim()) return alert("Введите заголовок");

    if (form.id) {
      await updateNews(form);
    } else {
      await createNews(form);
    }

    setForm({ id: null, title: "", description: "", urlToImage: "" });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700 }}>Управление новостями</h1>

      {/* Форма */}
      <div style={{ marginTop: 20 }}>
        <input
          style={input}
          placeholder="Заголовок"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          style={textarea}
          placeholder="Описание"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          style={input}
          placeholder="URL изображения"
          value={form.urlToImage}
          onChange={(e) => setForm({ ...form, urlToImage: e.target.value })}
        />

        <button onClick={onSubmit} style={button}>
          {form.id ? "Обновить" : "Добавить"}
        </button>
      </div>

      {/* Таблица */}
      <table style={{ width: "100%", marginTop: 40, borderSpacing: 0 }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Заголовок</th>
            <th style={th}>Действия</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((news) => (
            <tr key={news.id}>
              <td style={td}>{news.id}</td>
              <td style={td}>{news.title}</td>
              <td style={td}>
                <button
                  style={smallBtn}
                  onClick={() => setForm(news)}
                >
                  Edit
                </button>

                <button
                  style={{ ...smallBtn, background: "red" }}
                  onClick={() => deleteNews(news.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginTop: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const textarea = { ...input, height: 80 };

const button = {
  marginTop: 15,
  padding: "10px 20px",
  background: "black",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
};

const th = {
  borderBottom: "1px solid #ccc",
  padding: 12,
  textAlign: "left",
};

const td = {
  borderBottom: "1px solid #eee",
  padding: 12,
};

const smallBtn = {
  padding: "6px 12px",
  background: "gray",
  color: "white",
  borderRadius: 6,
  marginRight: 6,
  cursor: "pointer",
};
