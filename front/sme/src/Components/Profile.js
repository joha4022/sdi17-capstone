import React,{ useState, useEffect } from "react";
import { Toolbar, Typography, Button, Avatar, Paper, Grid, Box as MuiBox } from "@mui/material";
import { styled } from "styled-components";
import { ProfileDetails, ProfileDetail, Background, Bio, Notes, AppBar } from "../Styled";
import { useParams, Link } from "react-router-dom";


// const Bio = styled(Paper)`
//   flex-grow: 3;
//   overflow: auto;
//   margin: 20px;
//   padding: 20px;
// `;

// const Notes = styled(Paper)`
//   flex-grow: 2;
//   overflow: auto;
//   margin: 20px;
//   padding: 20px;
// `;

const Meetings = styled(Paper)`
  flex-grow: 3;
  overflow: auto;
  margin: 20px;
  padding: 20px;
`;

const AvatarAndDetails = styled(MuiBox)`
  flex-shrink: 0;
  flex-basis: 200px;
`;

function Profile() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:3001/${id}`);
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }else{
  //       const data = await res.json();
  //       setUser(data);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch profile data: ", error);
  //     }
  //   };

  //   fetchProfile();
  // }, [id]);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  const handleAddNote = (e) => {
    e.preventDefault();

    setNotes((prevNotes) => [...prevNotes, { text: newNote, checked: false }]);
    setNewNote("");
  };

  const handleEditNote = (index) => {
    setEditingNoteIndex(index);
    setEditingNoteText(notes[index].text);
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        i === editingNoteIndex ? { ...note, text: editingNoteText } : note
      )
    );
    setEditingNoteIndex(null);
    setEditingNoteText("");
  };

  const handleCheckNote = (index) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, i) =>
        i === index ? { ...note, checked: !note.checked } : note
      )
    );
  };
  const handleDeleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((note, i) => i !== index));
  };

  return (
    <Background>
      <AppBar position="static">
        <Toolbar>
          <Link to='/'>
            <img src="/images/Logo_background_purp.png" alt="Logo" style={{ width: 50, height: 50 }} />
          </Link>
          <MuiBox sx={{ flexGrow: 1 }} />
          <Button color="inherit">Home</Button>
          <Button color="inherit">Network</Button>
          <Button color="inherit">My Profile</Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} style={{ padding: 20, display: "flex" }}>
        <AvatarAndDetails>
          <Paper elevation={4} sx={{ margin: 5, padding: 5 }}>
            <Avatar
              alt="Name"
              src={user && user.image ? user.image : "/images/Blank_Avatar.jpg"}
              sx={{ width: 200, height: 200 }}
            />
          </Paper>
          <Paper elevation={2} sx={{ margin: 5, padding: 5 }}>
            <MuiBox>
              <ProfileDetails>
                <Typography>Name</Typography>
                <ProfileDetail> {user && user.name}</ProfileDetail>
              </ProfileDetails>
              <ProfileDetails>
                <Typography>Location</Typography>
                <ProfileDetail> {user && user.location}</ProfileDetail>
              </ProfileDetails>
              <ProfileDetails>
                <Typography>Associated Unit</Typography>
                <ProfileDetail> {user && user.unit}</ProfileDetail>
              </ProfileDetails>
            </MuiBox>

            <MuiBox>
              <Typography>Calendar</Typography>
            </MuiBox>
          </Paper>
        </AvatarAndDetails>

        <Grid item xs={12} sm={5}>
          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Bio>
              <Typography>Bio</Typography>
            </Bio>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Meetings>Meetings:</Meetings>
          </Paper>
          <MuiBox display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: 1, padding: 1 }}
            >
              Approve (SME)
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ margin: 1, padding: 1 }}
            >
              Decline (SME)
            </Button>
          </MuiBox>

          <Paper elevation={1} sx={{ margin: 1, padding: 1 }}>
            <Notes>
              Notes:
              <form onSubmit={handleAddNote}>
                <textarea
                  style={{ width: "100%", resize: "none" }}
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}/>
                <button type="submit">Add Note</button>
              </form>
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    {editingNoteIndex === index ? (
                      <form onSubmit={handleUpdateNote}>
                        <textarea
                          style={{ width: "100%" }}
                          rows={3}
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                        />
                        <button type="submit">Update Note</button>
                      </form>
                    ) : (
                      <>
                        <input
                          type="checkbox"
                          checked={note.checked}
                          onChange={() => handleCheckNote(index)}
                        />
                        <span style={{ textDecoration: note.checked ? "line-through" : "none" }}>
                          {note.text}
                        </span>
                        <button onClick={() => handleEditNote(index)}>Edit</button>
                        <button style={{color: 'red' }}onClick={() => handleDeleteNote(index)}>X</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </Notes>
          </Paper>
        </Grid>
      </Grid>
    </Background>
  );
}

export default Profile;