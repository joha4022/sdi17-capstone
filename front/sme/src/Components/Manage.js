import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  InputAdornment,
  TextField,
  CardActions,
  Button,
} from "@mui/material";
import {
  Search as SearchIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Manage.css";


const Manage = () => {
  const [SMEs, setSMEs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  //   const [location, setLocation] = useState("");


  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setSMEs(data));
  }, []);

  let results = SMEs;
  if (searchTerm.length > 0) {
    results = SMEs.filter((word) => {
      let name = [word.firstname, word.lastname].join(" ");
      return name.includes(searchTerm);
    });
  }

  return (
    <>
      <Navbar />

      <div
        className="filters"
        style={{ display: "flex", alignItems: "center", marginBottom: "1%" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "5%" }}
        >
          <TextField
            id="search"
            type="search"
            label="Search"
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
              <CardActionArea component={Link} to={`/sme/${e.userid}`}>
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
                    {`Expertise: ${e.categories}`}
                    {/* {console.log(e.categories)} */}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Branch: ${e.branch}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {e.email}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
      </section>
    </>
  );
};

export default Manage;
