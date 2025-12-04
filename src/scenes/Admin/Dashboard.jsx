export default function Dashboard() {
  const email = localStorage.getItem("email");
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔑 Chào mừng Admin</h2>
      <p>Bạn đã đăng nhập thành công với email: {email}</p>
    </div>
  );
}
