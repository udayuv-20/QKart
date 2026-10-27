import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const config = { endpoint: "http://localhost:3000" };

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${config.endpoint}/auth/login`, {
        username,
        password,
      });

      if (response.status === 201) {
        const { token, username, balance } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("balance", balance);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <Header hasHiddenAuthButtons />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
