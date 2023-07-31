import React from "react";
import { useEffect, useState } from "react";

const Photo = () => {

  const [photo, setPhoto] = useState('')

  const fetchImage = async () => {

    const temp = './photos/Lady.jpg'
    //map through this some how -> 'users.photo'
    const body = JSON.stringify({
      photopath: temp
    })

    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }
    
    const res = await fetch(`http://localhost:3001/getphoto`, option);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    
    console.log(imageObjectURL);
    setPhoto(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);


  return (
    <>
      <p>photo made it</p>
      <img src={photo} alt='' />
    </>
  );


}

export default Photo;