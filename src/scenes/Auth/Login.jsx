import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService"; // import service

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      const { token, nguoidung } = data;
      const vaitro = nguoidung.vaitro;

      localStorage.setItem("token", token);
      localStorage.setItem("vaitro", vaitro);
      localStorage.setItem("email", nguoidung.email || email);

      const roleInt = Number(vaitro);
      if (roleInt === 1) {
        navigate("/admin");
      } else if (roleInt === 2) {
        navigate("/user");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", background: "#007bff", color: "#fff", border: "none" },
  error: { color: "red", marginTop: "10px" }
};