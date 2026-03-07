import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // LOGIN → récupère token
      const loginResponse = await API.post("/user/login", {
        email,
        password,
      });

      const token = loginResponse.data.body.token;

      // PROFILE → récupère infos user
      const profileResponse = await API.post(
        "/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = profileResponse.data.body;

      console.log("Token reçu :", token);
      // Stocke user + token dans Redux
      dispatch(loginSuccess({ user, token }));

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
