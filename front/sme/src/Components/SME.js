import React from "react";
import { useParams } from "react-router-dom";

const SME = () => {

    const { id } = useParams();
    console.log(id)
    return ('Hello from SME page')
}

export default SME