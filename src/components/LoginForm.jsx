import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Typography, Box } from "@mui/material";

import { login, logout } from "../store/slices/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) return;
    dispatch(login({ name: username }));
  };

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {user ? (
        <>
          <Typography>Welcome, {user.name}!</Typography>
          <Button variant="contained" color="secondary" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <TextField
            size="small"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default LoginForm;
