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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  ViewModule as ViewModuleIcon,
  Map as MapIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./Network.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./Map.css";

const Network = () => {
  const [SMEs, setSMEs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  //   const [location, setLocation] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [onNetwork, setOnNetwork] = useState(false);
  const [view, setView] = useState("module");

  const mapPositions = [37.0902, -95.7129];
  const myIcon = L.icon({
    iconUrl: '/smeMarker.png',
    iconSize: [150, 110],
  });
  useEffect(() => {
    fetch("http://localhost:3001/smes")
      .then((res) => res.json())
      .then((data) => setSMEs(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategoryList(data));
  }, []);

  const clearHandle = () => {
    setSearchTerm("");
    setCategory("");
    setBranch("");
  };

  let results = SMEs;
  if (1) {
    if (searchTerm.length > 0) {
      results = SMEs.filter((word) => {
        let name = [word.firstname, word.lastname].join(" ");
        return name.includes(searchTerm);
      });
    }
    if (branch) {
      results = results.filter((word) => word.branch === branch);
    }
    if (category) {
      results = results.filter((word) => word.categories.includes(category));
    }
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
            sx={{ minWidth: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <FormControl sx={{ minWidth: 180, marginLeft: 10 }}>
          <InputLabel>Category</InputLabel>
          <Select
            id="category"
            value={category}
            label="Category"
            onChange={(event) => setCategory(event.target.value)}
          >
            {categoryList.map((e) => {
              return (
                <MenuItem value={`${e.categoryname}`}>
                  {e.categoryname}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180, marginLeft: 10 }}>
          <InputLabel>Branch</InputLabel>
          <Select
            id="branch"
            value={branch}
            label="Branch"
            onChange={(event) => setBranch(event.target.value)}
          >
            <MenuItem value={"Army"}>Army</MenuItem>
            <MenuItem value={"Navy"}>Navy</MenuItem>
            <MenuItem value={"Marine Corps"}>Marine Corps</MenuItem>
            <MenuItem value={"Air Force"}>Air Force</MenuItem>
            <MenuItem value={"Space Force"}>Space Force</MenuItem>
            <MenuItem value={"Coast Guard"}>Coast Guard</MenuItem>
            <MenuItem value={"National Guard"}>National Guard</MenuItem>
          </Select>
        </FormControl>

        <ToggleButton
          value="check"
          selected={onNetwork}
          onChange={() => {
            setOnNetwork(!onNetwork);
          }}
          sx={{ minWidth: 180, marginLeft: "10px" }}
        >
          <CheckCircleIcon />
          {"  In-Network"}
        </ToggleButton>

        <Button
          id="clearBut"
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={clearHandle}
          sx={{ minWidth: 180, marginLeft: "10px" }}
        >
          Clear Filters
        </Button>
      </div>

      <div className="viewToggle">
        <ToggleButtonGroup
          orientation="horizontal"
          value={view}
          exclusive
          onChange={() => {
            setView(view === "module" ? "map" : "module");
            console.log(view);
          }}
        >
          <ToggleButton value="module" aria-label="module">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="map" aria-label="map">
            <MapIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <section className="results">
        {view === "module" ? (
          results.map((e, i) => {
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
              </Card>
            );
          })
        ) : (
          <div id="mapContainer">
            <MapContainer
              className="map"
              center={[mapPositions[0], mapPositions[1]]}
              zoom={4}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {results.map((e, i) => {
                return (
                  <Marker
                  //! Need to find
                    position={[mapPositions[0]+Math.random()*10, mapPositions[1]+i]}
                    icon={myIcon}
                    riseOnHover={true}
                  >
                    <Popup>
                      <Card key={`map${i}`} sx={{ maxWidth: "15vw" }}>
                        <CardActionArea
                          component={Link}
                          to={`/sme/${e.userid}`}
                        >
                          {/* <CardMedia
                            component="img"
                            src={"/default.png"}
                            alt="User Profile Picture"
                          /> */}
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
                      </Card>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        )}
      </section>
    </>
  );
};

export default Network;
