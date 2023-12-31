import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import "./Navbar.css";
import { AppContext } from "../App";

const Navbar = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [photo, setPhoto] = useState();

  const url = window.location.href;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/getphoto", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ photopath: currentUser.photo }),
    })
      .then((res) => res.blob())
      .then((data) => setPhoto(URL.createObjectURL(data)));
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const accountCircleContainerStyle = {
    marginLeft: "auto",
  };

  const id = currentUser.userid;

  return (
    <div>
      <AppBar
        className="navBar"
        position="sticky"
        style={{ background: "#D2C8C8", marginBottom: "6vh" }}
      >
        <Toolbar>
          <div>
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
          </div>

          <div style={{ flexGrow: 1 }}>
            {url.includes("network") ||
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
                  to={`/profile/${id}`}
                  // sx={{ flexGrow: 1 }}
                  className="navBut"
                >
                  My Profile
                </Typography>
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
                {currentUser.admin ? (
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
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {/* <Typography
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
              </Typography> */}
              </>
            )}
          </div>

          {url.includes("network") ||
          url.includes("manage") ||
          url.includes("profile") ||
          url.includes("sme") ? (
            auth && (
              <div>
                <IconButton
                  size="large"
                  onClick={handleMenu}
                  color="inherit"
                  id="profileBut"
                  sx={{
                    width: 30,
                    height: 30, 
                    padding: 0.1, 
                    "& .MuiAvatar-root": {
                      width: "100%", 
                      height: "100%",
                    },
                  }}
                >
                  <Avatar
                    src={photo || "/Blank_Avatar.jpg"}
                    alt="User Profile Picture"
                  />
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
                  <MenuItem
                    component={Link}
                    to="/editprofile"
                    onClick={handleClose}
                  >
                    Edit Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      sessionStorage.clear();
                      setTimeout(() => {
                        navigate("/", { replace: true });
                      }, 1000);
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
