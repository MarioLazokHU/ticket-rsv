import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { setCookie } from "../utils/cookies";

import { useAuth } from "../components/context/AuthContext";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../utils/config";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    const request = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const response = await request.json();
    if (response.id && response.token) {
      setCookie("user", response, 7);
      login();
      window.location.replace("/");
    }
  };

  return (
    <div className="h-screen text-white w-screen flex flex-col items-center gap-5 justify-center">
      <Typography variant="h3" component="h3">
        Please LogIn
      </Typography>
      <div className="flex flex-col gap-5">
        <TextField
          name="email"
          label="Email"
          variant="standard"
          autoComplete="new-password"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="standard"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>LogIn</Button>
        <NavLink to="/register">You not registered?</NavLink>
      </div>
    </div>
  );
};
