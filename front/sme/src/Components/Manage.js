import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  InputAdornment,
  TextField,
  CardActions,
  Button,
  Box,
  Modal,
  Tab,
  Snackbar,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Search as SearchIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Manage.css";
import { AppContext } from "../App";

const Manage = () => {
  const [SMEs, setSMEs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("1");
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");
  const [dummy, setDummy] = useState(false)
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setSMEs(data));
  }, [open, dummy]);

  let results = [];
  if (tab === "2") {
    if (searchTerm.length > 0) {
      results = SMEs.filter((word) => {
        let name = [word.firstname, word.lastname].join(" ");
        return name.toUpperCase().includes(searchTerm.toUpperCase());
      });
    }
  } else if (tab === "1") {
    results = SMEs.filter((element) => {
      return !element.userverified;
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setToast(false);
  };

  const handleAccept = (e) => {
    let resBody = e
    e.userverified = true

    fetch(`http://localhost:3001/updateuser`, { method: "PATCH", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(resBody)})
    .then((res) => res.json())
    .then((data) => {
      setDummy(!dummy);
    })
      .catch((error) => console.error("Error:", error));
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/deleteuser/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setOpen(false);
        setToast(true);
        setMessage(data.message);
      })
      .catch((error) => console.error("Error:", error));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    // display: "flex",
    // justifyContent: "center"
  };

  return (
    <>
      {currentUser.admin ? (
        <>
          <Navbar />
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  id="tabList"
                  onChange={(event, newValue) => setTab(newValue)}
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab label="Pending SME Requests" value="1" />
                  <Tab label="Mangage Existing Users" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <section className="results">
                  {(results.length != 0) ? (
                    results.map((e, i) => {
                    return (
                      <Card key={`${i}`} sx={{ maxWidth: "15vw" }}>
                        <CardMedia
                          component="img"
                          src={"/default.png"}
                          alt="User Profile Picture"
                        />
                        {/* {console.log(`../../../../${e.photo}`)} */}
                        <CardContent>
                          <Typography variant="h5">
                            {`${e.firstname} ${e.lastname}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`User: ${e.email}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`Supervisor: ${e.supervisoremail}`}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            className="manageBut"
                            size="large"
                            variant="contained"
                            onClick={() => handleAccept(e)}
                          >
                            Accept
                          </Button>
                          <Button
                            className="manageBut"
                            size="large"
                            variant="contained"
                            // onClick={handleOpen}
                          >
                            Decline
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })) : (<p>No requests pending</p>)
                }
                </section>
              </TabPanel>
              <TabPanel value="2">
                <div
                  className="filters"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "5%",
                    }}
                  >
                    <TextField
                      id="search"
                      type="search"
                      label="Search for users"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      sx={{ minWidth: 500 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>

                <section className="results">
                  {results.map((e, i) => {
                    return (
                      <Card key={`${i}`} sx={{ maxWidth: "15vw" }}>
                        <CardMedia
                          component="img"
                          src={"/default.png"}
                          alt="User Profile Picture"
                        />
                        {/* {console.log(`../../../../${e.photo}`)} */}
                        <CardContent>
                          <Typography variant="h5">
                            {`${e.firstname} ${e.lastname}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`User: ${e.email}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {`Supervisor: ${e.supervisoremail}`}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            className="manageBut"
                            size="large"
                            variant="contained"
                            component={Link}
                            to={`/profile/${e.userid}`}
                          >
                            Manage
                          </Button>
                          <Button
                            className="manageBut"
                            size="large"
                            variant="contained"
                            onClick={handleOpen}
                          >
                            Delete
                          </Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box sx={{ ...style, width: 200 }}>
                              <h2 id="child-modal-title">
                                Are you sure you want to delete this user?
                              </h2>
                              <p id="child-modal-description">
                                This action cannot be undone
                              </p>
                              <Button onClick={() => handleDelete(e.userid)}>
                                Yes
                              </Button>
                              <Button onClick={handleClose}>No</Button>
                            </Box>
                          </Modal>
                          <div>
                            <Snackbar
                              open={toast}
                              autoHideDuration={6000}
                              onClose={handleClose}
                              message={message}
                            />
                          </div>
                        </CardActions>
                      </Card>
                    );
                  })}
                </section>
              </TabPanel>
            </TabContext>
          </Box>
        </>
      ) : (
        navigate("/denied")
      )}{" "}
    </>
  );
};

export default Manage;
