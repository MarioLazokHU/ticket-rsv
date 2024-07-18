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
  const [regexError, setRegexError] = useState(false);
  const { login } = useAuth();

  const handleRegister = async () => {
    const emailRegex = new RegExp("^[w.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$");
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[A-Za-zd]{8,}$"
    );
    if (emailRegex.test(email) && passwordRegex.test(password)) {
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
    } else {
     return setRegexError(true);
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
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          variant="standard"
          autoComplete="new-password"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          variant="standard"
          autoComplete="new-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={`${regexError ? 'bg-red-500' : ''}`}>*
          At least 8 characters long. Contains at least one uppercase letter
          (A-Z). Contains at least one lowercase letter (a-z). Contains at least
          one digit (0-9).
        </div>
        <Button variant="contained" onClick={handleRegister}>Register</Button>
        <NavLink to="/login">You have account?</NavLink>
      </div>
      {regError && <Alert severity="error">Something went wrong.</Alert>}
    </div>
  );
};
