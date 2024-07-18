import { Alert, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import { BASE_URL } from "../utils/config";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [regError, setRegError] = useState(false);
  const { login } = useAuth();

  const handleRegister = async () => {
    const request = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });
    const response = await request.json();
    if (response) {
      setRegError(false);
      login();
      window.location.replace("/login");
    } else {
      return setRegError(true);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-5 justify-center">
      <Typography variant="h3" component="h3">
        Registration
      </Typography>
      <div className="flex flex-col gap-5">
        <TextField
          name="name"
          label="Full Name"
          variant="standard"
          autoComplete="new-password"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          variant="standard"
          autoComplete="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
        <NavLink to="/login">You have account?</NavLink>
      </div>
      {regError && <Alert severity="error">Something went wrong.</Alert>}
    </div>
  );
};
