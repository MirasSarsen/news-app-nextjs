import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Админ панель</h1>

      <div style={{ marginTop: 20, display: "flex", gap: 20 }}>
        <Link href="/admin/news">
          <button style={btn}>Управление новостями</button>
        </Link>

        <Link href="/admin/users">
          <button style={btn}>Управление пользователями</button>
        </Link>
      </div>
    </div>
  );
}

const btn = {
  padding: "12px 20px",
  background: "#222",
  color: "#fff",
  borderRadius: 8,
  cursor: "pointer",
};
