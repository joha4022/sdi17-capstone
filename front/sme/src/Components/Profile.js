import React,{ useState, useEffect } from "react";
import { Typography, Button, Avatar, Paper, Grid, Box as MuiBox } from "@mui/material";
import { styled } from "styled-components";
import { ProfileDetails, ProfileDetail, Background, Bio, Notes } from "../Styled";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Loader from "./Loader";


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
  const [users, setUsers] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3001/profile/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }else {
        const data = await res.json();
        setUsers(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch profile data: ", error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!users) {
    return <Loader />;
  }

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
      <Navbar />

      <Grid container spacing={2} style={{ padding: 20, display: "flex" }}>
        <AvatarAndDetails>
          <Paper elevation={4} sx={{ margin: 5, padding: 5 }}>
            <Avatar
              alt="Name"
              src={users && users.image ? users.image : "/images/Blank_Avatar.jpg"}
              sx={{ width: 200, height: 200 }}
            />
          </Paper>
          <Paper elevation={2} sx={{ margin: 5, padding: 5 }}>
            <MuiBox>
              <ProfileDetails>
                <Typography>Name</Typography>
                <ProfileDetail> {users && `${users.firstname} ${users.lastname}`}</ProfileDetail>
              </ProfileDetails>
              <ProfileDetails>
                <Typography>Location</Typography>
                <ProfileDetail> {users && users.base}</ProfileDetail>
              </ProfileDetails>
              <ProfileDetails>
                <Typography>Associated Unit</Typography>
                <ProfileDetail> {users && users.unit}</ProfileDetail>
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