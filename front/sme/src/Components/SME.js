import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const SME = () => {

    const { id } = useParams();
    console.log(id)

    return (
      <>
        <Navbar />
        <p>{`Howdy from SME number ${id}'s page`}</p>
      </>
    )
}

export default SME