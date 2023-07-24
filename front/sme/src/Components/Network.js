import React from "react";
import { useEffect, useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const Network = () => {
    const [SMEs, setSMEs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/")
            .then((res) => res.json())
            .then((data) => setSMEs(data));
    }, []);

    return (
        <>
            <Navbar />
            {SMEs.map((e) => {
                return (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea component={Link} to={`/sme/${e.userid}`}>
                            <CardMedia
                                component="img"
                                src="/default.png"
                                alt="User Profile Picture"
                            />
                            <CardContent>
                                <Typography variant="h5">
                                    {`${e.firstname} ${e.lastname}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    SME Category (to fetch)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    SME Location (to fetch)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {e.email}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                );
            })}
        </>
    );
};

export default Network;
