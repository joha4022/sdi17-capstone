import React from "react";
import { useEffect, useState, useContext } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Network.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./Map.css";
import { AppContext } from "../App";
import FooterBar from "./FooterBar";

const Network = () => {
  const [SMEs, setSMEs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [onNetwork, setOnNetwork] = useState(false);
  const [view, setView] = useState("module");
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [location, setLocation] = useState([{ lat: 0, lon: 0 }]);
  const [photoList, setPhotoList] = useState([]);

  const navigate = useNavigate();

  const mapPositions = [37.0902, -95.7129];
  const myIcon = L.icon({
    iconUrl: "/smeMarker.png",
    iconSize: [150, 110],
  });

  useEffect(() => {
    !onNetwork
      ? fetch("http://localhost:3001/smes")
          .then((res) => res.json())
          .then((data) => setSMEs(data))
      : fetch(`http://localhost:3001/smes/${currentUser.userid}`)
          .then((res) => res.json())
          .then((data) => setSMEs(data));
  }, [onNetwork]);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategoryList(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/base")
      .then((res) => res.json())
      .then((data) => setLocation(data));
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = SMEs.map((e) => fetchImage(e));
      const images = await Promise.all(promises);
      setPhotoList(images);
    };
    fetchImages();
  }, [SMEs]); // Fetch images whenever SMEs changes

  const fetchImage = async (e) => {
    const body = JSON.stringify({
      photopath: e.photo,
    });
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };
    const res = await fetch(`http://localhost:3001/getphoto`, option);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    // console.log(e.userid, imageObjectURL);
    return imageObjectURL;
  };

  const clearHandle = () => {
    setSearchTerm("");
    setCategory("");
    setBranch("");
  };

 
  let results = SMEs.map((e,i) => ({...e, image: photoList[i]}))

  results = results.filter(
    (e) => e.userid !== currentUser.userid && e.userverified === 'verified'
  );
  if (searchTerm.length > 0) {
    results = results.filter(word => {
      let name = [word.firstname, word.lastname].join(" ");
      return name.toUpperCase().includes(searchTerm.toUpperCase());
    });
  }
  if (branch) {
    results = results.filter((word) => word.branch === branch);
  }
  if (category) {
    results = results.filter((word) => word.categories.includes(category));
  }

  return (
    <>
      {sessionStorage.getItem("currentUser") !== null ? (
        <>
          <Navbar />

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
                // console.log(view);
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
                  <Card key={`${e.userid}`} sx={{ maxWidth: "15vw" }}>
                    <CardActionArea
                      component={Link}
                      to={`/profile/${e.userid}`}
                    >
                       <CardMedia
                        component="img"
                        src={e.image || "/default.png"} // Use a placeholder image while loading
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
                        position={[
                          location[e.base - 1].baselat,
                          location[e.base - 1].baselon,
                        ]}
                        icon={myIcon}
                        riseOnHover={true}
                      >
                        <Popup>
                          <Card key={`map${i}`} sx={{ maxWidth: "15vw" }}>
                            <CardActionArea
                              component={Link}
                              to={`/profile/${e.userid}`}
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
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {`Expertise: ${e.categories}`}
                                  {/* {console.log(e.categories)} */}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {`Branch: ${e.branch}`}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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
      ) : (
        navigate("/denied")
      )}
      <FooterBar />
    </>
  );
};

export default Network;
