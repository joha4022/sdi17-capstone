import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import "./Navbar.css";

const Navbar = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const url = window.location.href;

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //!delete
  const id = 1;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="navBar"
        position="sticky"
        style={{ background: "#D2C8C8", marginBottom: "6vh" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              edge="start"
              style={{
                background: "#0A065D",
                borderRadius: 5,
                maxHeight: 90,
                maxWidth: 100,
              }}
              sx={{ mb: "-4vh", mr: 3 }}
              component={Link}
              to="/"
            >
              <img
                src="/SME-logos_transparent.png"
                style={{ maxHeight: "150px", maxWidth: "125px" }}
                alt="SME Logo"
              />
            </IconButton>
            <Typography
              style={{
                color: "#0A065D",
                textDecoration: "none",
                fontWeight: "bolder",
                margin: 10,
              }}
              component={Link}
              to="/"
              className="navBut"
            >
              Home
            </Typography>
            {
            url.includes("network") ||
            url.includes("manage") ||
            url.includes("profile") ||
            url.includes("sme") ? (
              <>
                <Typography
                  style={{
                    color: "#0A065D",
                    textDecoration: "none",
                    fontWeight: "bolder",
                    margin: 10,
                  }}
                  component={Link}
                  to="/network"
                  className="navBut"
                >
                  Network
                </Typography>
                <Typography
                  style={{
                    color: "#0A065D",
                    textDecoration: "none",
                    fontWeight: "bolder",
                    margin: 10,
                  }}
                  component={Link}
                  to="/manage"
                  className="navBut"
                >
                  Manage
                </Typography>
                <Typography
                  style={{
                    color: "#0A065D",
                    textDecoration: "none",
                    fontWeight: "bolder",
                    margin: 10,
                  }}
                  component={Link}
                  to={`/profile/${id}`}
                  // sx={{ flexGrow: 1 }}
                  className="navBut"
                >
                  My Profile
                </Typography>
              </>
            ) : (
              <p></p>
            )}
          </div>

          {auth && (
            <div>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
                id="profileBut"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
