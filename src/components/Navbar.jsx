import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            BookMyShow Clone
          </Link>
        </Typography>
        <LoginForm /> {/*Show login/logout button in Navbar */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
