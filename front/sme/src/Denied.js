import React from "react";

const Denied = () => {
//   var alarmSound = new Audio();
//   alarmSound.src = "/siren.mp3";
//   alarmSound.play();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>{`Get out of there you're not allowed`}</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          src="https://giphy.com/embed/l0ExeAkpaMaEAuX5e"
          width="480"
          height="320"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Denied;
