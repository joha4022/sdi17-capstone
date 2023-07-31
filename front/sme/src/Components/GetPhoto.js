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
      <div>
        <p>photo made it</p>
        <img src={photo} alt='' />
      </div>

      {/* <!-- Upload section--> */}
      <div>
        <h3>Upload Section</h3>
        {/* <!-- action to the /upload route--> */}
        <form action="http://localhost:3001/upload"
          method="post"
          enctype="multipart/form-data" >
          {/* File to be uploaded:  */}
          <input type="file"
            name="uploadFile"
            id="" />
          <br></br>
          <button type="submit">Upload</button>
        </form>
      </div>

      {/* <div>
        <h3>Download Section</h3>
        <br />
        <form action="http://localhost:3001/download"
          method="post" >
          <input
            type="hidden"
            photo="photopath"
          // id = ""
          // value = "./photos/Lady.jpg"
          // temp1 = "./photos/Lady.jpg"
          />

          <button type="submit">Download</button>
        </form>
      </div> */}
    </>
  );


}

export default Photo;