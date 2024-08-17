import React, { useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getCustomErrorMessage } from "./CustomErrorMessages";
import "./Login.css";
import { Link } from "react-router-dom";

const emailAdmin = "admin@gmail.com";
const passAdmin = "admin123";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (email === emailAdmin && password === passAdmin) {
        alert("Welcome Admin");
        sessionStorage.setItem("role", "admin");
        sessionStorage.setItem("Email", email);
        console.log(sessionStorage);
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Welcome User");
        sessionStorage.setItem("role", "user");
        sessionStorage.setItem("Email", email);
        console.log(sessionStorage);
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      const errorMessage = getCustomErrorMessage(error.code);
      setError(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop className="background-video">
        <source
          src="/Project Assets/video/5121285_School_Classroom_1920x1080_2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <Container className="login-container" sx={{ width: "30%" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin} className="login-form">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <button type="submit" variant="contained" className="login-button">
            Login
          </button>
        </form>
        <Link to={"/register"} className="menu-item">
          Register
        </Link>
      </Container>
    </div>
  );
};

export default Login;
